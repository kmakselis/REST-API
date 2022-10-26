const createCarViewModel = (carDoc) => ({
  id: carDoc._id.toString(),
  model: carDoc.model,
  engine: carDoc.engine,
  categoryId: carDoc.categoryId.toString(),
  color: carDoc.color,
  gearbox: carDoc.gearbox,
  maxSpeed: carDoc.maxSpeed,
  power: carDoc.power,
  zeroToHundred: carDoc.zeroToHundred,
  price: carDoc.price,
  img: carDoc.img,
});

module.exports = createCarViewModel;
