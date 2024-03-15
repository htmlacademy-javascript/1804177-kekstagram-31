const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (element) => element[getRandomInteger(0, element.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomArrayElement, getRandomInteger, isEscapeKey};
