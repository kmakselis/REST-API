const { Router } = require('express');
const categoriesRouter = require('./categories-router');
const carsRouter = require('./cars-router');

const apiRouter = Router();
apiRouter.use('/cars', carsRouter);
apiRouter.use('/categories', categoriesRouter);

module.exports = apiRouter;
