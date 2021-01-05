const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// GETTING SPECIFIC USER
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  const getUserID = `SELECT * FROM "users" WHERE id=$1;`;
  pool
    .query(getUserID, [req.params.id])
    .then((result) => {
      res.send(result.rows);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error getting specific user', error);
    });
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/id:', (req, res) => {
  const user = req.body;
  const editUser = `UPDATE "user" SET 
  is_active=$1,
  username=$2,
  user_password=$3,
  access_level=$4,
  first_name=$5,
  middle_name=$6,
  last_name=$7,
  posting_date=$8,
  sex=$9,
  zip_code=$10,
  company=$11,
  job_title=$12,
  motivation_bio=$13,
  experience_bio=$14,
  background_check_permission=$15,
  custom_entry_skills=$16
  WHERE id=$17;`;
  pool
    .query(editUser, [
      user.is_active,
      user.username,
      user.user_password,
      user.access_level,
      user.first_name,
      user.middle_name,
      user.last_name,
      user.posting_date,
      user.sex,
      user.zip_code,
      user.company,
      user.job_title,
      user.motivation_bio,
      user.experience_bio,
      user.background_check_permission,
      user.custom_entry_skills,
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error editing user', error);
      res.sendStatus(500);
    });
});

module.exports = router;
