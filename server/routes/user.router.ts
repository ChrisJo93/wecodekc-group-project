import { query, Request, Response } from 'express';
import express from 'express';
import rejectUnauthenticated from '../modules/authentication-middleware';
import pool from '../modules/pool';
import userStrategy from '../strategies/user.strategy';
import { encryptPassword } from '../modules/encryption';

const router: express.Router = express.Router();

router.get('/', rejectUnauthenticated, (req: Request, res: Response): void => {
  res.send(req.user);
});

router.post(
  '/register',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const username: string | null = <string>req.body.username;
    const password: string | null = encryptPassword(req.body.user_password);
    const firstName: string | null = <string>req.body.first_name;
    const middleName: string | null = <string>req.body.middle_name;
    const lastName: string | null = <string>req.body.last_name;
    const company: string | null = <string>req.body.company;
    const jobTitle: string | null = <string>req.body.job_title;
    const motivationBio: string | null = <string>req.body.motivation_bio;
    const experienceBio: string | null = <string>req.body.experience_bio;
    const customSkills: string | null = <string>req.body.custom_entry_skills;
    const backgroundCheck: boolean | null =
      req.body.background_check_permission;
    const sex: number | null = parseInt(req.body.sex);
    const zipCode: number | null = parseInt(req.body.zip_code);

    const queryText: string = `INSERT INTO "user" (username, user_password, first_name, middle_name,
      last_name, company, job_title, motivation_bio, experience_bio, custom_entry_skills, 
      background_check_permission, sex, zip_code, access_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $13, ${0}) RETURNING id`;
    pool
      .query(queryText, [
        username,
        password,
        firstName,
        middleName,
        lastName,
        company,
        jobTitle,
        motivationBio,
        experienceBio,
        customSkills,
        backgroundCheck,
        sex,
        zipCode,
      ])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(`Error saving user to database: ${err}`);
        res.sendStatus(500);
      });
  }
);

router.post(
  '/login',
  userStrategy.authenticate('local'),
  (req: Request, res: Response): void => {
    res.sendStatus(200);
  }
);

router.post('/logout', (req: Request, res: Response): void => {
  req.logout();
  res.sendStatus(200);
});

router.get(
  '/all',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // GET route to get all volunteers/mentors information
    const queryText: string = `SELECT * FROM "user"`;

    pool
      .query(queryText)
      .then((dbResponse) => {
        res.send(dbResponse.rows);
      })
      .catch((err) => {
        console.log('error getting all users', err);
        res.sendStatus(500);
      });
  }
);

export default router;
