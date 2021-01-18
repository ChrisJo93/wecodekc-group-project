import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';
const router: express.Router = express.Router();

//custom import third-party dependency
import * as nodemailer from 'nodemailer';

//random number function
function randomNumber(): number {
  return Math.floor(Math.random() * (1 + 5 - 1) + 1);
}

// GET ALL EVENTS
router.get(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getEvent: string = `SELECT * FROM "event"
    JOIN "event_images" ON "event".id = "event_images".event_id
    JOIN "images" on "event_images".image_id = "images".id
    ORDER BY event_end ASC;`;
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

router.get(
  '/:selection',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const selection = req.params.selection;
    console.log('EVENT SELECTION', selection);
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
    const getEventID: string = `SELECT "event".*, "time_slot_day".id AS "id_for_day", 
    "time_slot_day".day_number,"time_slot_day".day_name, link_url  FROM "event" 
    JOIN "day_slot" ON "event".id = "day_slot".event_id 
    JOIN "time_slot_day" ON "day_slot".time_slot_day = "time_slot_day".id
    JOIN "event_images" ON "event".id = "event_images".event_id
    JOIN "images" on "event_images".image_id = "images".id
    WHERE "event".id = $1;`;
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
        console.log('event_user stuff', result.rows);
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
    console.log('is this the event selection?', req.body);
    const queryText: string = `INSERT INTO "user_event" (event_id, user_id, approved) VALUES($1, $2, $3);`;
    const event_id: number = parseInt(req.body.eventId);
    const user_id: number = parseInt(req.user.id);
    const approved: boolean = req.body.approved;
    pool
      .query(queryText, [event_id, user_id, approved])
      .then((result) => {
        console.log('it happened, event inserted');
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
    const image_id: number = randomNumber();
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
            const queryText: string = `INSERT INTO "event_images" (event_id, image_id) VALUES ($1, $2)`;
            const queryArray: number[] = [eventId, image_id];
            pool
              .query(queryText, queryArray)
              .then((dbResponse) => {
                res.sendStatus(200);
              })
              .catch((err) => {
                console.log('error with inserting into event_images', err);
                res.sendStatus(500);
              });
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
    const queryText: string = `SELECT first_name, last_name, event_title, "user_event".id FROM "user_event"
    JOIN "event" ON "user_event".event_id = "event".id
    JOIN "user" ON "user_event".user_id = "user".id
    WHERE "user".id = $1`;
    const queryArray: number[] = [req.user.id];
    pool
      .query(queryText, queryArray)
      .then((dbResponse) => {
        const user_event_id: number = dbResponse.rows[0].id;
        const user_first_name: string = dbResponse.rows[0].first_name;
        const user_last_name: string = dbResponse.rows[0].last_name;
        const event_title: string = dbResponse.rows[0].event_title;
        const deleteEvent: string = `DELETE FROM "user_event" WHERE "id" =$1;`;
        pool
          .query(deleteEvent, [user_event_id])
          .then((result) => {
            // // referenced from Myron Schippers' repo on nodemailer
            // //send a message to the volunteer/mentor following verification (nodemailer)
            const transportConfig = {
              service: 'gmail',
              auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD,
              },
            };

            let transporter = nodemailer.createTransport(transportConfig);

            const mailOptions = {
              from: req.user.email, // sender address
              to: process.env.MAILER_EMAIL, // list of receivers
              subject: 'Event update about user', // Subject line
              html: `<div>
            <h1>Notification of change in event</h1>
            <p>${user_first_name} ${user_last_name} is no longer attending ${event_title}.</p>
          </div>`, // plain text body
            };
            transporter.sendMail(
              mailOptions,
              (err: Error | null, info: any) => {
                if (err != null) {
                  console.log(err, 'there is an error sending the email');
                  res.sendStatus(500);
                  return;
                }
                console.log('email sent');
                res.sendStatus(201);
              }
            );

            // res.sendStatus(200);
          })
          .catch((error) => {
            console.log(error);
            res.sendStatus(500);
          });
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  }
);

export default router;
