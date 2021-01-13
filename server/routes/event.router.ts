import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

// GET ALL EVENTS
router.get(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getEvent: string = `SELECT * FROM "event";`;
    pool
      .query(getEvent)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting events', error);
        res.sendStatus(500);
      });
  }
);

// GET EVENT BY ID
router.get(
  '/details/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getEventID: string = `SELECT * FROM "event" WHERE id=$1;`;
    pool
      .query(getEventID, [req.params.id])
      .then((result) => {
        console.log(result.rows);
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting specific event', error);
        res.sendStatus(500);
      });
  }
);
// get all calendar events by date
router.get(
  '/calendar/:date',
  (req: any, res: Response, next: express.NextFunction): void => {
    console.log(req.params.date);
    const dateQuery = `'%${new Date(req.params.date).getFullYear()}-%${
      new Date(req.params.date).getMonth() + 1
    }-%${new Date(req.params.date).getDate()}%'`;
    console.log('in server', dateQuery);
    const getEventID: string = `SELECT * FROM event WHERE event_start::text LIKE ${dateQuery};`;
    pool
      .query(getEventID)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting specific event', error);
        res.sendStatus(500);
      });
  }
);

// GET EVENT BY USER ID
router.get(
  '/user/:id',
  (req: any, res: Response, next: express.NextFunction): void => {
    const queryText: string = `SELECT * FROM "event" JOIN "user_event" ON "event".id = "user_event".event_id WHERE "user_event".user_id =$1;`;
    const queryArray: number[] = [req.user.id];
    pool
      .query(queryText, queryArray)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting events associated with user', error);
        res.sendStatus(500);
      });
  }
);

// POST EVENT

router.post(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const creator: number = parseInt(req.body.userId);
    const recurring: boolean = req.body.recurring;
    const recurring_time_slot: number = parseInt(req.body.recurring_time_slot);
    const event_type: number = parseInt(req.body.event_type);
    const event_address: string = req.body.event_address;
    const event_start: string = req.body.event_start;
    const event_end: string = req.body.event_end;
    const event_description: string = req.body.event_description;
    const event_title: string = req.body.event_title;

    const queryOne: string = `INSERT INTO "event"(event_title, event_description, event_start, event_end, 
      recurring, recurring_time_slot, event_address, event_type, creator) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    pool
      .query(queryOne, [
        event_title,
        event_description,
        event_start,
        event_end,
        recurring,
        recurring_time_slot,
        event_address,
        event_type,
        creator,
      ])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  }
);

// PUT EVENT
router.put(
  '/update/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const id: number = parseInt(req.params.id);
    const recurring: boolean = req.body.recurring;
    const recurring_time_slot: number = parseInt(req.body.recurring_time_slot);
    const event_type: number = parseInt(req.body.event_type);
    const event_address: string = req.body.event_address;
    const event_start: string = req.body.event_start;
    const event_end: string = req.body.event_end;
    const event_description: string = req.body.event_description;
    const event_title: string = req.body.event_title;
    const editEvent: string = `
    UPDATE "event" 
    SET event_title=$1, event_description=$2, event_start=$3, event_end=$4, 
    recurring=$5, recurring_time_slot=$6, event_address=$7, event_type=$8
    WHERE id=$9;`;
    pool
      .query(editEvent, [
        event_title,
        event_description,
        event_start,
        event_end,
        recurring,
        recurring_time_slot,
        event_address,
        event_type,
        id,
      ])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  }
);

// DELETE EVENT
router.delete(
  '/delete/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const deleteEvent: string = `DELETE FROM "event" WHERE "id" =$1;`;
    pool
      .query(deleteEvent, [req.params.id])
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
