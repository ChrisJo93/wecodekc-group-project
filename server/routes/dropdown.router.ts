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
    const getEducation: string = `SELECT * FROM "education";`;
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
  '/race',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getRace: string = `SELECT * FROM "race";`;
    pool
      .query(getRace)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting race', error);
        res.sendStatus(500);
      });
  }
);

router.get(
  '/sex',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getSex: string = `SELECT * FROM "sex";`;
    pool
      .query(getSex)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting sex', error);
        res.sendStatus(500);
      });
  }
);

export default router;
