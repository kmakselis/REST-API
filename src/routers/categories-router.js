const { Router } = require('express');
const { fetchAll } = require('../controllers/categories-controller');

const categoriesRouter = Router();

categoriesRouter.get('/', fetchAll);

module.exports = categoriesRouter;
