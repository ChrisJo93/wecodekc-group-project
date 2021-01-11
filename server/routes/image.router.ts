import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET route template
 */
router.get(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // GET route code here
  }
);

/**
 * POST route to upload profile picture for a logged in user
 */
router.post(
  '/profile',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // POST route code here

    const link: string = req.body.link;
    const queryText: string = `INSERT INTO "images" (image_name, link_url) VALUES ('profile picture', $1) RETURNING id`;
    const queryArray: string[] = [link];
    pool
      .query(queryText, queryArray)
      .then((dbResponse) => {
        res.sendStatus(200);
      })
      .catch();
  }
);

export default router;
