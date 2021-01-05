import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';
import rejectUnauthenticated from '../modules/authentication-middleware';

const router: express.Router = express.Router();

router.get(
  '/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // GET route to get notes associated with a specific volunteer/mentor
    const queryText: string = `SELECT * FROM "admin_note" WHERE "user_id_subject" = $1`;
    const queryArray: string[] = [req.params.id];

    pool
      .query(queryText, queryArray)
      .then((dbResponse) => {
        res.send(dbResponse.rows);
      })
      .catch((err) => {
        console.log(`error getting notes: ${err}`);
      });
  }
);

export default router;
