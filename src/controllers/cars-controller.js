const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const CarModel = require('../models/car-model');

const createCarNotFoundError = (carId) => createNotFoundError(`Car with id '${carId}' was not found`);

const joinableProps = ['categoryId'];

const fetchAll = async (req, res) => {
  const { joinBy } = req.query;

    try {
      const carDocuments = joinBy === 'categoryId'
      ? await CarModel.find().populate('categoryId')
      : await CarModel.find();

      res.status(200).json(carDocuments);
    } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const carId = req.params.id;
  const { joinBy } = req.query;

  try {
    const foundCar = joinBy === 'categoryId'
    ? await CarModel.find().populate('categoryId')
    : await CarModel.find();
    if (foundCar === null) throw createCarNotFoundError(carId);

    res.status(200).json(foundCar);
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newCarData = req.body;

  try {
    CarModel.validate(newCarData);

    const newCar = await CarModel.create(newCarData);

    res.status(201).json(newCar);

  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const carId = req.params.id;
  const {
    model,
    engine,
    categoryId,
    color,
    gearbox,
    maxSpeed,
    power,
    zeroToHundred,
    price,
    img,
  } = req.body;
  const newCarData = {
    model,
    engine,
    categoryId,
    color,
    gearbox,
    maxSpeed,
    power,
    zeroToHundred,
    price,
    img,
  };

  try {
    CarModel.validate(newCarData);

    const updatedCar = await CarModel.findByIdAndUpdate(
      carId,
      newCarData,
      { new: true, runValidators: true }
    );
    if (updatedCar === null) throw createCarNotFoundError(carId);

    res.status(200).json(updatedCar);

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const carId = req.params.id;
  const {
    model,
    engine,
    categoryId,
    color,
    gearbox,
    maxSpeed,
    power,
    zeroToHundred,
    price,
    img,
  } = req.body;
  const newCarData = removeEmptyProps({
    model,
    engine,
    categoryId,
    color,
    gearbox,
    maxSpeed,
    power,
    zeroToHundred,
    price,
    img,
  });

  try {
    CarModel.validateUpdate(newCarData);

    const updatedCar = await CarModel.findByIdAndUpdate(
      carId,
      newCarData,
      { new: true }
    );

    if (updatedCar === null) throw createCarNotFoundError(carId);

    res.status(200).json(updatedCar);

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const carId = req.params.id;

  try {
    const deletedCar = await CarModel.findByIdAndDelete(carId);

    if (deletedCar === null) throw createCarNotFoundError(carId);

    res.status(200).json(deletedCar);

  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
