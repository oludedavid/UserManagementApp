require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const port = 8000;
const usersDbUri = process.env.USERS_DB_URI;
const app = express();
const db = mongoose.connection;

module.exports = { usersDbUri, app, db, port, mongoose };
