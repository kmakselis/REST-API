let currentId = 2;
const createId = () => ++currentId;

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
&& categoryId !== undefined && typeof categoryId === 'number' && categoryId > 0
&& color !== undefined && typeof color === 'string' && color !== ''
&& gearbox !== undefined && typeof gearbox === 'string' && gearbox !== ''
&& maxSpeed !== undefined && typeof maxSpeed === 'string' && maxSpeed !== ''
&& power !== undefined && typeof power === 'string' && power !== ''
&& zeroToHundred !== undefined && typeof zeroToHundred === 'string' && zeroToHundred !== ''
&& price !== undefined && typeof price === 'string' && price !== ''
&& img !== undefined && typeof img === 'string' && img !== '';

const createCmpById = (carIdStr) => ({ id }) => id === Number(carIdStr);

const removeEmptyProps = (obj) => Object.entries(obj).reduce((prevResult, [key, value]) => {
  if (value !== undefined) {
    prevResult[key] = value;
  }

  return prevResult;
}, {});

module.exports = {
  createId,
  isValidCar,
  createCmpById,
  removeEmptyProps,
};
