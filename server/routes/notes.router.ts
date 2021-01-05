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

router.post(
  '/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // POST route code to add a new note
    const creator: number = req.user['id'];
    const subject: number = parseInt(req.params.id);
    const note: string = req.body.note;
    const queryText: string = `INSERT INTO "admin_note" (user_id_creator, user_id_subject, note_on_subject) VALUES ($1, $2, $3);`;
    const queryArray: [number, number, string] = [creator, subject, note];

    pool
      .query(queryText, queryArray)
      .then((dbResponse) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(`error posting notes: ${err}`);
      });
  }
);

export default router;
