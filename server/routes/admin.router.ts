import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();
console.log('called');
router.get(
  '/allUserGet',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getAllUsers: string = `SELECT * FROM "user" WHERE access_level > 1;`;
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

router.get(
  '/unverifiedGet',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getAllUsers: string = `SELECT * FROM "user" WHERE access_level = 1;`;
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

router.put(
  '/verify',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const access_level: number = parseInt(req.body.access_level);
    const id: number = parseInt(req.body.id);
    const volunteer_role: number = parseInt(req.body.volunteer_role);
    const query = `UPDATE "user" 
    SET access_level=$1, volunteer_role=$2
    WHERE id=$3;`;
    pool
      .query(query, [access_level, volunteer_role, id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  }
);

export default router;
