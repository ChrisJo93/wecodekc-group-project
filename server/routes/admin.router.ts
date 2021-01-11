import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();
console.log('called');
router.get(
  '/allUserGet',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getAllUsers: string = `SELECT * FROM "user";`;
    pool
      .query(getAllUsers)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting allUsers', error);
        res.sendStatus(500);
      });
  }
);

export default router;
