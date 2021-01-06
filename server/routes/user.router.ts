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
    const firstName: string | null = <string>req.body.first_name;
    const middleName: string | null = <string>req.body.middle_name;
    const lastName: string | null = <string>req.body.last_name;
    const company: string | null = <string>req.body.company;
    const jobTitle: string | null = <string>req.body.job_title;
    const motivationBio: string | null = <string>req.body.motivation_bio;
    const experienceBio: string | null = <string>req.body.experience_bio;
    const customSkills: string | null = <string>req.body.custom_entry_skills;
    const skills: Array<number> | null = req.body.skills;
    const timeSlot: Array<number> | null = req.body.time_slot;
    const educationLevel: Array<number> | null = req.body.education_level;
    const race: Array<number> | null = req.body.race;
    const backgroundCheck: boolean | null =
      req.body.background_check_permission;
    const sex: number | null = parseInt(req.body.sex);
    const zipCode: number | null = parseInt(req.body.zip_code);

    const queryOne: string = `INSERT INTO "user" (username, user_password, first_name, middle_name,
      last_name, company, job_title, motivation_bio, experience_bio, custom_entry_skills,
      background_check_permission, sex, zip_code, access_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $13, ${0}) RETURNING id`;
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
      ])
      .then(() => {
        let array: Array<number> | null = skills;
        for (let index = 0; index < array.length; index++) {
          let element: number | null = array[index];
          let query: string = `INSERT INTO "user_skills" (user_id, element) VALUES ($1, $2)`;
          pool.query(query, [userId, element]);
        }
      })
      .then(() => {
        let array: Array<number> | null = timeSlot;
        for (let index = 0; index < array.length; index++) {
          let element: number | null = array[index];
          let query: string = `INSERT INTO "user_time_slot" (user_id, element) VALUES ($1, $2)`;
          pool.query(query, [userId, element]);
        }
      })
      .then(() => {
        let array: Array<number> | null = educationLevel;
        for (let index = 0; index < array.length; index++) {
          let element: number | null = array[index];
          let query: string = `INSERT INTO "user_education_level" (user_id, element) VALUES ($1, $2)`;
          pool.query(query, [userId, element]);
        }
      })
      .then(() => {
        let array: Array<number> | null = race;
        for (let index = 0; index < array.length; index++) {
          let element: number | null = array[index];
          let query: string = `INSERT INTO "user_race" (user_id, element) VALUES ($1, $2)`;
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
