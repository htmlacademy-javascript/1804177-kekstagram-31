const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const uniqueRandomNumberGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};
const generateUniqueRandomNumber = uniqueRandomNumberGenerator(1, 25);
const getRandomArrayElement = (element) => element[getRandomInteger(0, element.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomArrayElement, generateUniqueRandomNumber, getRandomInteger, isEscapeKey};
