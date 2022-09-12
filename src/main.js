const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const carsRouter = require('./routers/cars-router');

const server = express();

const { SERVER_DOMAIN, SERVER_PROTOCOL, SERVER_PORT } = process.env;
const constantsConfiguredInEnvFile = SERVER_DOMAIN && SERVER_PROTOCOL && SERVER_PORT;

try {
  if (!constantsConfiguredInEnvFile) {
    throw new Error('Project constants are not defined.\n\t Define constants in \'/.env\' file.');
  }

  // Middleware
  server.use(express.json());
  server.use(morgan('tiny'));
  server.use(cors());

  // Routes
  server.use('/cars', carsRouter);

  server.listen(SERVER_PORT, (err) => {
    if (err) {
      console.error('Serverio paleidimo klaida');
    }

    console.log(`serveris veikia ant ${SERVER_PROTOCOL}://${SERVER_DOMAIN}:${SERVER_PORT}`);
  });
} catch (err) {
  console.error(err.message);
}
