"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");
const express = require("express");
const { authenticateJWT, ensureUserExists, validateAndEnsureAdmin, ensureCorrectUserOrAdmin, ensureAdmin, validateUserCreation, validateUserRegistration } = require("../middleware/auth");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");

const router = express.Router();


/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: login
 **/

router.post("/", authenticateJWT, validateAndEnsureAdmin(userNewSchema), async function (req, res, next) {
  try {
    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    console.error(err.message); // Log the error message
    console.error(err.stack); // Log the stack trace
    return next(err);
  }
});

/** POST /register { user } => { user, token }
 *
 * Public registration endpoint for users to create their own account.
 * 
 * This returns the newly registered user and an authentication token for them:
 * { user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * No authorization required.
 **/
router.post("/register", validateUserRegistration(userNewSchema), async function (req, res, next) {
  try {
    
    // Set isAdmin to false by default for self-registered users
    const newUser = { ...req.body, isAdmin: false };
    const user = await User.register(newUser);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});


/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: admin
 **/

router.get("/", ensureAdmin, async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});


/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin }
 *
 * Authorization required: login
 **/

router.get("/:username", authenticateJWT, ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: login
 **/

router.delete("/:username", authenticateJWT, ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;



