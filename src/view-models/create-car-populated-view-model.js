const createCarPopulatedViewModel = (carPopulatedDoc) => ({
  id: carPopulatedDoc._id.toString(),
  model: carPopulatedDoc.model,
  engine: carPopulatedDoc.engine,
  color: carPopulatedDoc.color,
  gearbox: carPopulatedDoc.gearbox,
  maxSpeed: carPopulatedDoc.maxSpeed,
  power: carPopulatedDoc.power,
  zeroToHundred: carPopulatedDoc.zeroToHundred,
  price: carPopulatedDoc.price,
  img: carPopulatedDoc.img,
  category: carPopulatedDoc.categoryId.title,
  categoryId: carPopulatedDoc.categoryId.id,
});

module.exports = createCarPopulatedViewModel;
