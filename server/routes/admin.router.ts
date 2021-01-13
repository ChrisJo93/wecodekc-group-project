import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

//custom import third-party dependency
import * as nodemailer from 'nodemailer';

const router: express.Router = express.Router();
console.log('called');
router.get(
  '/allUserGet',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getAllUsers: string = `SELECT * FROM "user" WHERE access_level > 1;`;
    pool
      .query(getAllUsers)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting allUsers', error);
        res.sendStatus(500);
      });
  }
);

router.get(
  '/unverifiedGet',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const getAllUsers: string = `SELECT * FROM "user" WHERE access_level = 1;`;
    pool
      .query(getAllUsers)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error getting allUsers', error);
        res.sendStatus(500);
      });
  }
);

router.put(
  '/verify',
  (req: any, res: Response, next: express.NextFunction): void => {
    const access_level: number = parseInt(req.body.access_level);
    const id: number = parseInt(req.body.id);
    const volunteer_role: number = parseInt(req.body.volunteer_role);
    const email: string = req.body.email;
    const first_name: string = req.body.first_name;
    const query = `UPDATE "user" 
    SET access_level=$1, volunteer_role=$2
    WHERE id=$3;`;

    pool
      .query(query, [access_level, volunteer_role, id])
      .then((result) => {
        // referenced from Myron Schippers' repo on nodemailer
        //send a message to the volunteer/mentor following verification (nodemailer)
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
          to: email, // list of receivers
          subject: 'WeCodeKC approves you!', // Subject line
          html: `<div>
            <h1>Hello, ${first_name}!</h1>
            <p>You have been approved and can now sign up for events! Thanks for joining us at WeCodeKC</p>
          </div>`, // plain text body
        };

        transporter.sendMail(mailOptions, (err: Error | null, info: any) => {
          if (err != null) {
            console.log(err, 'there is an error sending the email');
            res.sendStatus(500);
            return;
          }
          console.log('email sent');
          res.sendStatus(201);
        });

        // res.sendStatus(200);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  }
);

export default router;
