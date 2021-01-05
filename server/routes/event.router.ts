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
    const { name, time, description } = req.body;
    const postEvent: string = `
  INSERT INTO "events" 
  ("name", "time", "description")
  VALUES ($1, $2, $3)`;
    pool

      //STUBBED VALUES NEED REPLACING

      .query(postEvent, [name, time, description])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error posting events', error);
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
module.exports = router;
