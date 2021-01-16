import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';
const router: express.Router = express.Router();

// GET ALL EVENTS
router.get(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getEvent: string = `SELECT * FROM "event" ORDER BY event_end ASC;`;
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
    const getEventID: string = `SELECT "event".*, "time_slot_day".id AS "id for day", 
    "time_slot_day".day_number,"time_slot_day".day_name  FROM "event" JOIN "day_slot" 
    ON "event".id = "day_slot".event_id JOIN "time_slot_day" ON "day_slot".time_slot_day 
    = "time_slot_day".id WHERE "event".id = $1;`;
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
    console.log('in server', req.params.date);
    const date = `'${req.params.date}%'`;

    const getEventID: string = `SELECT * FROM event WHERE event_start::text LIKE ${date}`;
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
  '/user',
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

// POST EVENT WITH USER ID
router.post(
  '/user',
  (req: any, res: Response, next: express.NextFunction): void => {
    console.log(req.body);
    const queryText: string = `INSERT INTO "user_event" (event_id, user_id, approved) VALUES($1, $2, $3);`;
    const event_id: number = parseInt(req.body.eventId);
    const user_id: number = parseInt(req.user.id);
    const approved: boolean = req.body.approved;
    pool
      .query(queryText, [event_id, user_id, approved])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('error posting events associated with user', error);
        res.sendStatus(500);
      });
  }
);

// POST EVENT

router.post(
  '/',
  (req: any, res: Response, next: express.NextFunction): void => {
    const creator: number = parseInt(req.user.id);
    const recurring: boolean = req.body.recurring;
    const count: number = parseInt(req.body.count);
    const recurring_time_slot: Array<number> = req.body.recurring_time_slot;
    const frequency: string = req.body.frequency;
    const event_type: number = parseInt(req.body.event_type);
    const event_address: string = req.body.event_address;
    const event_start: string = req.body.event_start;
    const event_end: string = req.body.event_end;
    const event_description: string = req.body.event_description;
    const event_title: string = req.body.event_title;
    const queryOne: string = `INSERT INTO "event"(event_title, event_description, event_start, event_end, 
      recurring, event_address, event_type, creator, count, frequency) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`;
    pool
      .query(queryOne, [
        event_title,
        event_description,
        event_start,
        event_end,
        recurring,
        event_address,
        event_type,
        creator,
        count,
        frequency,
      ])
      .then((result) => {
        const eventId = parseInt(result.rows[0].id);
        let eventPromises: Array<Promise<any>> = [];
        for (let index = 0; index < recurring_time_slot.length; index++) {
          let element: number = recurring_time_slot[index];
          let query: string = `INSERT INTO "day_slot" (event_id, time_slot_day) VALUES ($1, $2)`;
          eventPromises.push(pool.query(query, [eventId, element]));
        }
        Promise.all(eventPromises)
          .then(() => {
            res.sendStatus(200);
          })
          .catch(() => {
            res.sendStatus(500);
          });
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  }
);

// PUT EVENT
router.put(
  '/update/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const id = req.params.id;
    const recurring: boolean = req.body.recurring;
    const count: number = parseInt(req.body.count);
    const recurring_time_slot: Array<number> = req.body.recurring_time_slot;
    const frequency: string = req.body.frequency;
    const event_type: number = parseInt(req.body.event_type);
    const event_address: string = req.body.event_address;
    const event_start: string = req.body.event_start;
    const event_end: string = req.body.event_end;
    const event_description: string = req.body.event_description;
    const event_title: string = req.body.event_title;
    const query: string = `UPDATE "event" 
    SET event_title=$1, event_description=$2, event_start=$3, event_end=$4, 
    recurring=$5, event_address=$7, event_type=$8, frequency=$10, count=$11  WHERE id=$9;`;
    pool
      .query(query, [
        event_title,
        event_description,
        event_start,
        event_end,
        recurring,
        recurring_time_slot,
        event_address,
        event_type,
        id,
        frequency,
        count,
      ])
      .then((result) => {
        const eventId = parseInt(result.rows[0].id);
        let eventPromises: Array<Promise<any>> = [];
        for (let index = 0; index < recurring_time_slot.length; index++) {
          let element: number = recurring_time_slot[index];
          let query: string = `UPDATE "event" SET event_title=$1, event_description=$2 WHERE id=$3,`;
          eventPromises.push(pool.query(query, [eventId, element, id]));
        }
        Promise.all(eventPromises)
          .then(() => {
            res.sendStatus(200);
          })
          .catch(() => {
            res.sendStatus(500);
          });
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

// DELETE USER EVENT
router.delete(
  '/user/:id',
  (req: any, res: Response, next: express.NextFunction): void => {
    console.log(req.body);
    const deleteEvent: string = `DELETE FROM "user_event" WHERE "id" =$1;`;
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
