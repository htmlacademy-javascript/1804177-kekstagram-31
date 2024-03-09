import {getRandomArrayElement, getRandomInteger} from './util.js';

const NAMES = [
  'Игорь',
  'Илья',
  'Карина',
  'Сергей',
  'Алина',
  'Виктория',
  'Григорий',
  'Аркадий',
];

const DESCRIPTION = [
  'Чудесный пейзаж',
  'Передо мной интересная фотография',
  'Кекс и корм',
  'Работа не волк',
  'Кормлю голубей',
];

const MESSAGES = [
  'В целом всё неплохо. Но не всё.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];

const generateComments = function () {
  return {
    id : getRandomInteger(1, 25),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

const createUserData = function () {
  return {
    id: getRandomInteger(1, 25),
    url: `photos/${getRandomInteger(1, 25)}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    like: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, generateComments),
  };
};

const getUserData = () => Array.from({length: 25}, createUserData);

export {getUserData};
