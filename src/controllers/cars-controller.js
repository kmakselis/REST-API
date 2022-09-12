const {
  createId,
  isValidCar,
  removeEmptyProps,
  createCmpById,
} = require('../helpers');

const createCarNotFoundError = (carId) => ({
  message: `Car with id '${carId}' was not found`,
  status: 404
});

const createCarBadDataError = (dataObj) => ({
  message: `Car data is invalid:\n${JSON.stringify(dataObj, null, 4)}`,
  status: 400
});

const database = {
  cars: [{
      id: 1,
      model: 'Aston Martin Vantage F1 Edition',
      engine: '4,0 L V8 Twin Turbo',
      categoryId: 1,
      color: 'Lunar White',
      gearbox: 'Automatinė',
      maxSpeed: '354 km/h',
      power: '527 AG (387kW)',
      zeroToHundred: '3,6 s',
      price: '190 796 €',
      img: 'https://i.imgur.com/g07oIWY.jpg',
    },
    {
      id: 2,
      model: 'Aston Martin Vantage F1 Edition',
      engine: '4.0 L V8 Twin Turbo',
      categoryId: 1,
      color: 'Jet Black',
      gearbox: 'Automatinė',
      maxSpeed: '354 km/h',
      power: '527 AG (387kW)',
      zeroToHundred: '3,6 s',
      price: '190 456 €',
      img: 'https://i.imgur.com/10HEpLT.jpg',
    },
    {
      id: 3,
      model: 'Aston Martin Vantage',
      engine: '4.0 L V8 Twin Turbo',
      categoryId: 1,
      color: 'Golden Saffron',
      gearbox: 'Automatinė',
      maxSpeed: '354 km/h',
      power: '527 AG (387kW)',
      zeroToHundred: '3,6 s',
      price: '178 814 €',
      img: 'https://i.imgur.com/ERzM1ED.jpg',
    },
    {
      id: 4,
      model: 'Aston Martin Vantage',
      engine: '4.0 L V8 Twin Turbo',
      categoryId: 1,
      color: 'China Gray',
      gearbox: 'Automatinė',
      maxSpeed: '354 km/h',
      power: '503 AG (375kW)',
      zeroToHundred: '3,6 s',
      price: '184 944 €',
      img: 'https://i.imgur.com/rXZefm1.jpg',
    },
    {
      id: 5,
      model: 'Aston Martin DBX',
      engine: '4.0 L V8 Twin Turbo',
      categoryId: 2,
      color: 'Onyx Black',
      gearbox: 'Automatinė',
      maxSpeed: '317 km/h',
      power: '551 AG (405kW)',
      zeroToHundred: '4,5 s',
      price: '239 682 €',
      img: 'https://i.imgur.com/5xYLdpH.jpg',
    },
    {
      id: 6,
      model: 'Aston Martin DBX',
      engine: '4.0 L V8 Twin Turbo',
      categoryId: 2,
      color: 'Minotaur Green',
      gearbox: 'Automatinė',
      maxSpeed: '317 km/h',
      power: '551 AG (405kW)',
      zeroToHundred: '4,5 s',
      price: '222 674 €',
      img: 'https://i.imgur.com/s2kEGBw.jpg',
    },
    {
      id: 7,
      model: 'Aston Martin DBX707',
      engine: '4.0 L V8 Twin Turbo',
      categoryId: 2,
      color: 'Titanium Gray',
      gearbox: 'Automatinė',
      maxSpeed: '310 km/h',
      power: '707 AG (520kW)',
      zeroToHundred: '3,3 s',
      price: '267 948 €',
      img: 'https://i.imgur.com/IDc1FZF.jpg',
    },
    {
      id: 8,
      model: 'Aston Martin Vantage',
      engine: '4.0 L V8 Twin Turbo',
      categoryId: 1,
      color: 'Marine Blue',
      gearbox: 'Automatinė',
      maxSpeed: '317 km/h',
      power: '510 AG (375kW)',
      zeroToHundred: '3,6 s',
      price: '154 750 €',
      img: 'https://i.imgur.com/2Nhxtmd.jpg',
    },
    {
      id: 9,
      model: 'Aston Martin DBX',
      engine: '4.0 L V8 Twin Turbo',
      categoryId: 2,
      color: 'Contemporary',
      gearbox: 'Automatinė',
      maxSpeed: '317 km/h',
      power: '551 AG (405kW)',
      zeroToHundred: '4,5 s',
      price: '227 966 €',
      img: 'https://i.imgur.com/6ESmkNq.jpg',
    },
    {
      id: 10,
      model: 'Aston Martin DBX',
      engine: '4.0 L V8 Twin Turbo',
      categoryId: 2,
      color: 'Contemporary Minotaur Green',
      gearbox: 'Automatinė',
      maxSpeed: '317 km/h',
      power: '551 AG (405kW)',
      zeroToHundred: '20',
      price: '222 644 €',
      img: 'https://i.imgur.com/C1P5ORC.jpg',
    },
  ],
};

const fetchAll = (req, res) => {
  res.status(200).json(database.cars);
};

const fetch = (req, res) => {
  const carId = req.params.id;

  try {
    const foundCar = database.cars.find(createCmpById(carId));
    if (foundCar === undefined) throw createCarNotFoundError(carId);

    res.status(200).json(foundCar);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const create = (req, res) => {
  const newCarData = req.body;

  try {
    if (!isValidCar(newCarData)) throw createCarBadDataError(newCarData);

    const newCar = {
      id: createId(),
      ...newCarData,
    };

    database.cars.push(newCar);

    res.status(201).json(newCar);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const replace = (req, res) => {
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

    const foundCarIndex = database.cars.findIndex(createCmpById(carId));
    if (foundCarIndex === -1) throw createCarNotFoundError(carId);

    const updatedCar = {
      id: database.cars[foundCarIndex].id,
      ...newCarData,
    };

    database.cars[foundCarIndex] = updatedCar;

    res.status(200).json(updatedCar);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const update = (req, res) => {
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
    const foundCarIndex = database.cars.findIndex(createCmpById(carId));
    if (foundCarIndex === -1) throw createCarNotFoundError(carId);

    const updatedCar = {
      ...database.cars[foundCarIndex],
      ...newCarData,
    };

    database.cars[foundCarIndex] = updatedCar;

    res.status(200).json(updatedCar);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const remove = (req, res) => {
  const carId = req.params.id;

  try {
    const foundCarIndex = database.cars.findIndex(createCmpById(carId));
    if (foundCarIndex === -1) throw createCarNotFoundError(carId);

    const [deletedCar] = database.cars.splice(foundCarIndex, 1);

    res.status(200).json(deletedCar);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
