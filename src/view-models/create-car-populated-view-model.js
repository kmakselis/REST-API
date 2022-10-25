const createCategoryViewModel = require("./create-category-view-model");

const createCarPopulatedViewModel = (carPopulatedDoc) => ({
  id: carPopulatedDoc._id.toString(),
  model: carPopulatedDoc.model,
  engine: carPopulatedDoc.engine,
  category: createCategoryViewModel(carPopulatedDoc.categoryId),
  color: carPopulatedDoc.color,
  gearbox: carPopulatedDoc.gearbox,
  maxSpeed: carPopulatedDoc.maxSpeed,
  power: carPopulatedDoc.power,
  zeroToHundred: carPopulatedDoc.zeroToHundred,
  price: carPopulatedDoc.price,
  img: carPopulatedDoc.img,
  createdAt: carPopulatedDoc.createdAt,
  updatedAt: carPopulatedDoc.updatedAt,
});

module.exports = createCarPopulatedViewModel;
