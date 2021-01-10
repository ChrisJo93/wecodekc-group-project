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
  'details/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getEventID: string = `SELECT * FROM event JOIN event_type ON (event.event_type = event_type.id) WHERE event.id=$1;`;
    pool
      .query(getEventID, [req.params.id])
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
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getEventID: string = `SELECT * FROM "event" WHERE id=$1;`;
    pool
      .query(getEventID, [req.params.id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting specific event', error);
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
    const { name, time, description, id } = req.body;
    const editEvent: string = `
    UPDATE "event" 
    SET name=$1, time=$2, description=$3
    WHERE id=$4;`;
    pool
      .query(editEvent, [name, time, description, req.params.id])
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
