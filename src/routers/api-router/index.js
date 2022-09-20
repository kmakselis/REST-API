const { Router } = require('express');
const categoriesRouter = require('./categories-router');
const carsRouter = require('./cars-router');
const usersRouter = require('./users-router');

const apiRouter = Router();
apiRouter.use('/cars', carsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
