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

const MESSAGES = [
  'В целом всё неплохо. Но не всё.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];

function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}
const getRandomArrayElement = (element) => element[getRandomInteger(0, element.length - 1)];

const createUserData = function () {
  return {
    id: getRandomInteger(1, 25),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    like: getRandomInteger(1, 6),
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

const userData = Array.from({length: 25}, createUserData);
userData();
