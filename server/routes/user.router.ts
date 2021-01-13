import { query, Request, Response } from 'express';
import express from 'express';
import rejectUnauthenticated from '../modules/authentication-middleware';
import pool from '../modules/pool';
import userStrategy from '../strategies/user.strategy';
import { encryptPassword } from '../modules/encryption';
import { promises } from 'dns';

const router: express.Router = express.Router();

router.get('/', rejectUnauthenticated, (req: Request, res: Response): void => {
  res.send(req.user);
});

router.post(
  '/register',
  (req: Request, res: Response, next: express.NextFunction): void => {
    console.log(req.body);
    const username: string = <string>req.body.username;
    const password: string = encryptPassword(req.body.password);
    const firstName: string = <string>req.body.first_name;
    const middleName: string = <string>req.body.middle_name;
    const lastName: string = <string>req.body.last_name;
    const email: string = <string>req.body.email;
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
    let newUserId: number;

    const queryOne: string = `INSERT INTO "user"(username, password,  first_name, middle_name,
      last_name, race, company, job_title, motivation_bio, experience_bio, custom_entry_skills,
      background_check_permission, sex, zip_code, access_level, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id;`;
    pool
      .query(queryOne, [
        username,
        password,
        firstName,
        middleName,
        lastName,
        race,
        company,
        jobTitle,
        motivationBio,
        experienceBio,
        customSkills,
        backgroundCheck,
        sex,
        zipCode,
        1,
        email,
      ])
      .then((result) => {
        newUserId = parseInt(result.rows[0].id);
        let userPromises: Array<Promise<any>> = [];
        for (let index = 0; index < skills.length; index++) {
          let element: number = skills[index];
          let query: string = `INSERT INTO "user_skills" (user_id, skills_id) VALUES ($1, $2)`;
          userPromises.push(pool.query(query, [newUserId, element]));
        }
        for (let index = 0; index < timeSlot.length; index++) {
          let element: number = timeSlot[index];
          let query: string = `INSERT INTO "user_time_slot" (user_id, time_slot_id) VALUES ($1, $2)`;
          userPromises.push(pool.query(query, [newUserId, element]));
        }
        for (let index = 0; index < educationLevel.length; index++) {
          let element: number = educationLevel[index];
          let query: string = `INSERT INTO "user_education_level" (user_id, education_level) VALUES ($1, $2)`;
          userPromises.push(pool.query(query, [newUserId, element]));
        }
        Promise.all(userPromises)
          .then(() => {
            res.sendStatus(200);
          })
          .catch(() => {
            res.sendStatus(500);
          });
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  }
);
//making minor change for merge issue

router.put(
  '/register/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const password: string = encryptPassword(req.body.password);
    const company: string = <string>req.body.company;
    const jobTitle: string = <string>req.body.job_title;
    const motivationBio: string = <string>req.body.motivation_bio;
    const experienceBio: string = <string>req.body.experience_bio;
    const customSkills: string = <string>req.body.custom_entry_skills;
    const skills: Array<number> = req.body.skills;
    const timeSlot: Array<number> = req.body.time_slot;
    const educationLevel: Array<number> = req.body.education_level;
    const backgroundCheck: boolean = req.body.background_check_permission;
    const zipCode: number = parseInt(req.body.zip_code);
    const userId: number = parseInt(req.params.id);

    const queryOne: string = `UPDATE "USER" SET (password = $1, company = $2, job_title = $3, motivation_bio = $4, 
      experience_bio = $5, custom_entry_skills = $6, background_check_permission = $7, zip_code = $8);`;
    pool
      .query(queryOne, [
        password,
        company,
        jobTitle,
        motivationBio,
        experienceBio,
        customSkills,
        backgroundCheck,
        zipCode,
      ])
      .then((result) => {
        let userPromises: Array<Promise<any>> = [];
        for (let index = 0; index < skills.length; index++) {
          let element: number = skills[index];
          let query: string = `INSERT INTO "user_skills" (user_id, skills_id) VALUES ($1, $2)`;
          userPromises.push(pool.query(query, [userId, element]));
        }
        for (let index = 0; index < timeSlot.length; index++) {
          let element: number = timeSlot[index];
          let query: string = `INSERT INTO "user_time_slot" (user_id, time_slot_id) VALUES ($1, $2)`;
          userPromises.push(pool.query(query, [userId, element]));
        }
        for (let index = 0; index < educationLevel.length; index++) {
          let element: number = educationLevel[index];
          let query: string = `INSERT INTO "user_education_level" (user_id, education_level) VALUES ($1, $2)`;
          userPromises.push(pool.query(query, [userId, element]));
        }
        Promise.all(userPromises)
          .then(() => {
            res.sendStatus(200);
          })
          .catch(() => {
            res.sendStatus(500);
          });
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
  '/all/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // GET route to get all volunteers/mentors information
    const queryText: string = `SELECT 
    sex_label,first_name, middle_name, last_name, birth_date,posting_date,
    zip_code,phone_number,company,job_title,motivation_bio,experience_bio,
    custom_entry_skills,access_label,role_label,
    array_agg(DISTINCT(skills_label)) AS "skills_label_array", 
    array_agg(DISTINCT(education_label)) AS "education_label_array",
    array_agg(DISTINCT(time_slot_label)) AS "time_slot_label_array",
    array_agg(DISTINCT(link_url)) AS "image_link_array"
    FROM "user" 
    JOIN "user_skills" ON "user".id = "user_skills".user_id 
    JOIN "skills" ON "skills".id = "user_skills".id 
    JOIN "user_education_level" ON "user".id  = "user_education_level".user_id 
    JOIN "education_level" ON "user_education_level".education_level = "education_level".id  
    JOIN "user_time_slot" ON "user".id = "user_time_slot".user_id
    JOIN "time_slot" ON "user_time_slot".time_slot_id = "time_slot".id
    JOIN "user_images" ON "user".id = "user_images".user_id 
    JOIN "images" ON "user_images".image_id = "images".id
    JOIN "sex" ON "user".sex = "sex".id
    JOIN "access_level" ON "user".access_level = "access_level".id
    JOIN "volunteer_role" ON "user".volunteer_role = "volunteer_role".id
    WHERE "user".id = $1 GROUP BY 
    sex_label,username, first_name, middle_name, last_name, birth_date,posting_date,zip_code,phone_number,company,
    job_title,motivation_bio,experience_bio,custom_entry_skills,access_label,role_label;`;

    pool
      .query(queryText, [req.params.id])
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
