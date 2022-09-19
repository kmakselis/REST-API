const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../../controllers/cars-controller');

const carsRouter = Router();

carsRouter.get('/', fetchAll);

carsRouter.get('/:id', fetch);

carsRouter.post('/', create);

carsRouter.put('/:id', replace);

carsRouter.patch('/:id', update);

carsRouter.delete('/:id', remove);

module.exports = carsRouter;
