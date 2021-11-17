/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const consola = require('consola');

mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
const connectionUrl = process.env.MONGO_DB_URI;
consola.info('Connecting to Mongo DB...');
mongoose.connect(connectionUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    consola.success('MongoDB connected successfully');
  }).catch((err) => {
    consola.error('Unable to connect to mongoBD   ', err);
    process.exit();
  });

module.exports = mongoose;
