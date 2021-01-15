import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * POST route to upload profile picture for a logged in user
 */
router.post(
  '/profile',
  (req: any, res: Response, next: express.NextFunction): void => {
    // POST route code here
    const user_id = req.user.id;
    const queryRemove: string = `DELETE FROM "user_images" WHERE user_id = $1`;
    const queryRemoveArray: string[] = [user_id];
    const queryInsert: string = `INSERT INTO "images" (image_name, link_url) VALUES ('profile picture', $1) RETURNING id`;
    const link: string = req.body.link;
    const queryInsertArray: string[] = [link];
    pool
      .query(queryRemove, queryRemoveArray)
      .catch((err) => {
        console.log('error posting image to images', err);
        res.sendStatus(500);
      })
      .then(() => {
        pool.query(queryInsert, queryInsertArray).then((dbResponse) => {
          const image_id = dbResponse.rows[0].id;
          const user: number = req.user.id;
          const queryText: string = `INSERT INTO "user_images" (user_id , image_id) VALUES ($1, $2)`;
          const queryArray: number[] = [user, image_id];
          pool
            .query(queryText, queryArray)
            .then((dbResponse) => {
              console.log('yes, it happened. image posted!');
              res.sendStatus(200);
            })
            .catch((err) => {
              console.log('error posting image to user_images', err);
              res.sendStatus(500);
            });
        });
      })
      .catch((err) => {
        console.log('error posting image to images', err);
        res.sendStatus(500);
      });
  }
);

export default router;
