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
    const userId: number = parseInt(req.body.id);
    const username: string = <string>req.body.username;
    const password: string = encryptPassword(req.body.user_password);
    const firstName: string = <string>req.body.first_name;
    const middleName: string = <string>req.body.middle_name;
    const lastName: string = <string>req.body.last_name;
    const company: string = <string>req.body.company;
    const jobTitle: string = <string>req.body.job_title;
    const motivationBio: string = <string>req.body.motivation_bio;
    const experienceBio: string = <string>req.body.experience_bio;
    const customSkills: string = <string>req.body.custom_entry_skills;
    const skills: Array<number> = req.body.skills;
    const timeSlot: Array<number> = req.body.time_slot;
    const educationLevel: Array<number> = req.body.education_level;
    const race: number = req.body.race;
    const backgroundCheck: boolean = req.body.background_check_permission;
    const sex: number = parseInt(req.body.sex);
    const zipCode: number = parseInt(req.body.zip_code);

    const queryOne: string = `INSERT INTO "user" (username, user_password, first_name, middle_name,
      last_name, company, job_title, motivation_bio, experience_bio, custom_entry_skills,
      background_check_permission, sex, zip_code, access_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $13, ${0}, #14) RETURNING id`;
    pool
      .query(queryOne, [
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
        race,
      ])
      .then(() => {
        let array: Array<number> = skills;
        for (let index = 0; index < array.length; index++) {
          let element: number = array[index];
          let query: string = `INSERT INTO "user_skills" (user_id, element) VALUES ($1, $2)`;
          pool.query(query, [userId, element]);
        }
      })
      .then(() => {
        let array: Array<number> = timeSlot;
        for (let index = 0; index < array.length; index++) {
          let element: number = array[index];
          let query: string = `INSERT INTO "user_time_slot" (user_id, element) VALUES ($1, $2)`;
          pool.query(query, [userId, element]);
        }
      })
      .then(() => {
        let array: Array<number> = educationLevel;
        for (let index = 0; index < array.length; index++) {
          let element: number = array[index];
          let query: string = `INSERT INTO "user_education_level" (user_id, element) VALUES ($1, $2)`;
          pool.query(query, [userId, element]);
        }
      })
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log(error);
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
