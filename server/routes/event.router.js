const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET ALL EVENTS
router.get('/', (req, res) => {
  const getEvent = `SELECT * FROM "event";`;
  pool
    .query(getEvent)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error getting events', error);
      res.sendStatus(500);
    });
});

// GET EVENT BY ID
router.get('details/:id', (req, res) => {
  const getEventID = `SELECT * FROM "event" WHERE id=$1;`;
  pool
    .query(getEventID, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error getting specific event', error);
      res.sendStatus(500);
    });
});

// GET EVENT BY USER ID
router.get('/user/:id', (req, res) => {
  const getEventID = `SELECT * FROM "event" WHERE id=$1;`;
  pool
    .query(getEventID, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error getting specific event', error);
      res.sendStatus(500);
    });
});

// POST EVENT
router.post('/', (req, res) => {
  const event = req.body;
  const postEvent = `
  INSERT INTO "events" 
  ("name", "time", "description")
  VALUES ($1, $2, $3)`;
  pool

    //STUBBED VALUES NEED REPLACING

    .query(postEvent, [event.name, event.time, event.description])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error posting events', error);
      res.sendStatus(500);
    });
});

// PUT EVENT
router.put('/update/:id', (req, res) => {
  const event = req.body;
  const editEvent = `
    UPDATE "event" 
    SET name=$1, time=$2, description=$3
    WHERE id=$4;`;
  pool

    // STUBBED VALUES NEED REPLACING

    .query(editEvent, [
      event.name,
      event.time,
      event.description,
      req.params.id,
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// DELETE EVENT
router.delete('/delete/:id', (req, res) => {
  const deleteEvent = `DELETE FROM "event" WHERE "id" =$1;`;
  pool
    .query(deleteEvent, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
module.exports = router;
