const stringLength = (string, maxLength) => string.length <= maxLength;

stringLength('проверяемая строка', 20);
stringLength('проверяемая строка', 18);
stringLength('проверяемая строка', 10);

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
