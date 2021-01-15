import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET route template
 */
router.get(
  '/education',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getEducation: string = `SELECT * FROM "education_level";`;
    pool
      .query(getEducation)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting education', error);
        res.sendStatus(500);
      });
  }
);

router.get(
  '/ethnicity',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getethnicity: string = `SELECT * FROM "ethnicity";`;
    pool
      .query(getethnicity)
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
    const getgender: string = `SELECT * FROM "gender";`;
    pool
      .query(getgender)
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
  '/skill',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getSkill: string = `SELECT * FROM "skills";`;
    pool
      .query(getSkill)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting skill', error);
        res.sendStatus(500);
      });
  }
);

router.get(
  '/time',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getTimeSlot: string = `SELECT * FROM "day_slot";`;
    pool
      .query(getTimeSlot)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting time', error);
        res.sendStatus(500);
      });
  }
);

router.get(
  '/language',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getLanguages: string = `SELECT * FROM "languages";`;
    pool
      .query(getLanguages)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting language', error);
        res.sendStatus(500);
      });
  }
);

export default router;
