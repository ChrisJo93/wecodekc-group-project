import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

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
