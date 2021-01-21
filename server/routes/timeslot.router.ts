import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

// /**
//  * GET route template
//  */
// router.get(
//   '/',
//   (req: Request, res: Response, next: express.NextFunction): void => {
//     // GET route code here
//   }
// );

/**
 * POST route template
 */
router.post(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // POST route code here
    const dayOfWeek: number = <number>req.body.day_of_week;
    const timeSlotLabel: string = <string>req.body.time_slot_label;
    const dateTimeStart: string = <string>req.body.date_time_start;
    const dateTimeEnd: string = <string>req.body.date_time_end;

    const queryOne: string = `INSERT INTO time_slot(day_of_week, time_slot_label) 
      VALUES ($1, $2)`;
    pool
      .query(queryOne, [dayOfWeek, timeSlotLabel])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  }
);

router.delete(
  '/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const deleteTimeSlot: string = `DELETE FROM time_slot WHERE "id" =$1;`;
    pool
      .query(deleteTimeSlot, [req.params.id])
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
