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
    const username: string | null = <string>req.body.username;
    const password: string | null = encryptPassword(req.body.password);

    const queryText: string = `INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id`;
    pool
      .query(queryText, [username, password])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(`Error saving user to database: ${err}`);
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
