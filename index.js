/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const user = require('./app/routes/user');
const inventory = require('./app/routes/inventory');
const cart = require('./app/routes/cart');
const consola = require('consola');
require('dotenv').config();
require('./app/settings/settings');

const app = express();

const port = process.env.PORT || 8080;
const appName = process.env.APP_NAME;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use(cors());
app.use(logger('dev'));
app.use(user);
app.use(inventory);
app.use(cart);

//Default route
app.get('/', (req, res) => {
  consola.info('Welcome to the Inventory Management System');
  res.sendFile(__dirname + "/postmanDoc.html");
});

//App Listen
app.listen(port, (res) => {
  consola.success(`${appName} is listening on ${port}`);
});

module.exports = app;
