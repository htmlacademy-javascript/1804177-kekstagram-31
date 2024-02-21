const stringLength = (string, maxLength) => string.length <= maxLength;

(stringLength('проверяемая строка', 20));
(stringLength('проверяемая строка', 18));
(stringLength('проверяемая строка', 10));

const palindrome = (string) => {
  const newString = string.replaceAll(' ', '').toLowerCase();
  let emptyString = '';

  for (let i = newString.length - 1; i >= 0; i--) {
    emptyString += newString[i];
  }
  return emptyString === newString;
};

palindrome('топот');
palindrome('ДовОд');
palindrome('Кекс');

const extractNumbers = (string = '') => {
  let result = '';
  for (let i = 0; i <= string.length - 1; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return result === '' ? NaN : Number(result);
};

extractNumbers('2023 год');
extractNumbers('ECMAScript 2022');
extractNumbers('1 кефир, 0.5 батона');
extractNumbers('агент 007');
extractNumbers('а я томат');
