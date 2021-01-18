import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

router.get(
  '/users/:selection',
  (req: Request, res: Response, next: express.NextFunction): void => {
    let condition;
    const selection: number = parseInt(req.params.selection);
    switch (selection) {
      case 1:
        condition = `volunteer_role`;
        break;
      case 2:
        condition = `gender`;
        break;
      case 3:
        condition = `ethnicity`;
        break;
      default:
        condition = `volunteer_role`;
        break;
    }
    const queryText: string = `SELECT 
    gender_label,first_name, middle_name, last_name, birth_date,posting_date,
    zip_code,phone_number,company,job_title,motivation_bio,experience_bio, ethnicity_label,education_label,
    custom_entry_skills, access_label, role_label, access_label, education_label,email,volunteer_role,
    ARRAY(SELECT skills_label FROM "user" 
		JOIN "user_skills" ON "user".id = "user_skills".user_id
		JOIN "skills" on "user_skills".skills_id = "skills".id) AS "skills_label_array",
	ARRAY(SELECT note_on_subject FROM "user"
		JOIN "admin_note" ON "user".id = "admin_note".user_id_subject) AS "admin_note_array",
    ARRAY(SELECT time_slot_label FROM "user"
		JOIN "user_time_slot" ON "user".id = "user_time_slot".user_id
		JOIN time_slot ON "user_time_slot".time_slot_id = time_slot.id) AS "time_slot_label_array",
    ARRAY(SELECT link_url FROM "user"
		JOIN "user_images" ON "user".id = "user_images".user_id 
    JOIN "images" ON "user_images".image_id = "images".id) AS "image_link_array"FROM "user" 
	JOIN "access_level" ON "user".access_level = "access_level".id
  JOIN "volunteer_role" ON "user".volunteer_role = "volunteer_role".id
  JOIN "education_level" ON "user".highest_education_level = "education_level".id
    JOIN "ethnicity" ON "user".ethnicity = "ethnicity".id 
    JOIN "gender" ON "user".gender = "gender".id
    WHERE "volunteer_role" != 1 ORDER BY ${condition} DESC;
`;

    pool
      .query(queryText)
      .then((dbResponse) => {
        res.send(dbResponse.rows);
      })
      .catch((err) => {
        console.log('error getting user detail data', err);
        res.sendStatus(500);
      });
  }
);

router.get(
  '/ethnicity',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText = `SELECT
(SELECT COUNT( ethnicity) FROM "user" WHERE ethnicity = 1) AS "White",
(SELECT COUNT( ethnicity) FROM "user" WHERE ethnicity = 2) AS "Hispanic",
(SELECT COUNT( ethnicity) FROM "user" WHERE ethnicity = 3) AS "Black",
(SELECT COUNT( ethnicity) FROM "user" WHERE ethnicity = 4) AS "Native Am",
(SELECT COUNT( ethnicity) FROM "user" WHERE ethnicity = 5) AS "Native Ha",
(SELECT COUNT( ethnicity) FROM "user" WHERE ethnicity = 6) AS "Asian",
(SELECT COUNT( ethnicity) FROM "user" WHERE ethnicity = 7) AS "Two or more",
(SELECT COUNT( ethnicity) FROM "user" WHERE ethnicity = 8) AS "prefer not",
(SELECT COUNT(id) FROM "user") AS "total";`;
    pool
      .query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting ethnicity', error);
        res.sendStatus(500);
      });
  }
);

router.get(
  '/gender',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText = `SELECT
    (SELECT COUNT( gender) FROM "user" WHERE gender = 1) AS "Male",
    (SELECT COUNT( gender) FROM "user" WHERE gender = 2) AS "Female",
    (SELECT COUNT( gender) FROM "user" WHERE gender = 3) AS "Trans",
    (SELECT COUNT( gender) FROM "user" WHERE gender = 4) AS "Non-Binary",
    (SELECT COUNT( gender) FROM "user" WHERE gender = 5) AS "Gender Neutral",
    (SELECT COUNT( gender) FROM "user" WHERE gender = 6) AS "Not Listed",
    (SELECT COUNT(id) FROM "user") AS "total";`;
    pool
      .query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting gender', error);
        res.sendStatus(500);
      });
  }
);

router.get(
  '/volunteerRole',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText = `SELECT
    (SELECT COUNT( volunteer_role) FROM "user" WHERE volunteer_role = 1) AS "None",
    (SELECT COUNT( volunteer_role) FROM "user" WHERE volunteer_role = 2) AS "Tech Ins",
    (SELECT COUNT( volunteer_role) FROM "user" WHERE volunteer_role = 3) AS "Tech Ass",
    (SELECT COUNT( volunteer_role) FROM "user" WHERE volunteer_role = 4) AS "Classroom Ass",
    (SELECT COUNT( volunteer_role) FROM "user" WHERE volunteer_role = 5) AS "Non Tech Vol",
    (SELECT COUNT( volunteer_role) FROM "user" WHERE volunteer_role = 6) AS "Social Media Vol",
    (SELECT COUNT( volunteer_role) FROM "user" WHERE volunteer_role = 7) AS "General Office Adm",
    (SELECT COUNT( volunteer_role) FROM "user" WHERE volunteer_role = 8) AS "General IT_Tech",
    (SELECT COUNT(id) FROM "user") AS "total";`;
    pool
      .query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting gender', error);
        res.sendStatus(500);
      });
  }
);

export default router;
