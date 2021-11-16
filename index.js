/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
require('./app/settings/settings');
const user = require('./app/route/user');
const inventory = require('./app/route/inventory');
const cart = require('./app/route/cart')

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
app.use(user);
app.use(inventory);
app.use(cart);

app.get('/', (req, res) => {
  console.log('Welcome to the Inventory Management System');
  res.send('Welcome to the Inventory Management System');
});

app.listen(port, (res) => {
  console.log(`${appName} is listening on ${port}`);
});

module.exports = app;
