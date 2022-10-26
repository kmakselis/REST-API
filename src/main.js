const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const carsRouter = require('./routers/cars-router');
const categoriesRouter = require('./routers/categories-router');

const server = express();

const { SERVER_DOMAIN, SERVER_PROTOCOL, SERVER_PORT, DB_CONNECTION } = process.env;
const constantsConfiguredInEnvFile = SERVER_DOMAIN && SERVER_PROTOCOL && SERVER_PORT && DB_CONNECTION;

try {
  if (!constantsConfiguredInEnvFile) {
    throw new Error('Project constants are not defined.\n\t Define constants in \'/.env\' file.');
  }

  // Middleware
  server.use(express.json());
  server.use(morgan('tiny'));
  server.use(cors());
  server.use(express.static('public'));

  // Routes
  server.use('/cars', carsRouter);
  server.use('/categories', categoriesRouter);

  mongoose.connect(DB_CONNECTION, (err) => {
    if (err) {
      throw err.message;
    }
    console.log('connected to MongoDB Atlass');
    server.listen(SERVER_PORT, (err) => {
      if (err) {
        console.error('Serverio paleidimo klaida');
      }

      console.log(`server launched on ${SERVER_PROTOCOL}://${SERVER_DOMAIN}:${SERVER_PORT}`);
    });
  });

} catch (err) {
  console.error(err.message);
}
