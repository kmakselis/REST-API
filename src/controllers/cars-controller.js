const { removeEmptyProps } = require('../helpers');
const { RequestError,
  createBadDataError,
  createNotFoundError,
  sendErrorResponse
} = require('../helpers/errors/index')
const CarModel = require('../models/car-model');

const isValidCar = ({
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
}) => model !== undefined && typeof model === 'string' && model !== ''
&& engine !== undefined && typeof engine === 'string' && engine !== ''
&& categoryId !== undefined && typeof categoryId === 'string' && engine !== ''
&& color !== undefined && typeof color === 'string' && color !== ''
&& gearbox !== undefined && typeof gearbox === 'string' && gearbox !== ''
&& maxSpeed !== undefined && typeof maxSpeed === 'string' && maxSpeed !== ''
&& power !== undefined && typeof power === 'string' && power !== ''
&& zeroToHundred !== undefined && typeof zeroToHundred === 'string' && zeroToHundred !== ''
&& price !== undefined && typeof price === 'string' && price !== ''
&& img !== undefined && typeof img === 'string' && img !== '';

const createCarNotFoundError = (carId) => createNotFoundError(`Car with id '${carId}' was not found`);
const createCarBadDataError = (dataObj) => createBadDataError(`Car data is invalid:\n${JSON.stringify(dataObj, null, 4)}`);

const fetchAll = async (req, res) => {
  try {
    const carDocuments = await CarModel.find();

    res.status(200).json(carDocuments);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const carId = req.params.id;

  try {
    const foundCar = await CarModel.findById(carId);
    if (foundCar === undefined) throw createCarNotFoundError(carId);

    res.status(200).json(foundCar);
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newCarData = req.body;

  try {
    if (!isValidCar(newCarData)) throw createCarBadDataError(newCarData);

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
    if (!isValidCar(newCarData)) throw createCarBadDataError(newCarData);

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
    const deletedCar = await CarModel.findByIdAndDelete(carId)

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
