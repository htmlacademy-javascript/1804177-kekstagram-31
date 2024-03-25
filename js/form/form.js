const uploadForm = document.querySelector('#upload-select-image');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const MAX_SYMBOLS_COMMENTS = 140;
const MAX_SYMBOLS_HASHTAGS = 20;
const MAX_HASHTAGS = 5;
let message = '';
const errorMessage = () => message;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const isCommentLength = (value) => value.length <= MAX_SYMBOLS_COMMENTS;
const isValidForm = (value) => {
  const inputValue = value.toLowerCase().trim();
  const inputArray = inputValue.split(' ');

  if (!inputArray) {
    return true;
  }

  const validationRules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэштег не может состоять только из одной решётки'
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги разделяются пробелами'
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег начинается с символа "#" (решётка)'
    },
    {
      check: inputArray.some((item, index, array) => array.includes(item, index + 1)),
      error: 'Хэштег не может быть использован дважды'
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS_HASHTAGS),
      error: `максимальная длина одного хэштега ${MAX_SYMBOLS_HASHTAGS} символов, включая решётку`
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэштегов`
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы'
    },
  ];

  return validationRules.every((rule) => {
    const isValid = rule.check;
    if (isValid) {
      message = rule.error;
    }
    return !isValid;
  });
};

const formSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    hashtagsInput.value = hashtagsInput.value.trim().replaceAll('', ' ');
    uploadForm.submit();
  }
};

pristine.addValidator(commentInput, isCommentLength, `длина комментария не может составлять больше ${MAX_SYMBOLS_COMMENTS} символов`);
pristine.addValidator(hashtagsInput, isValidForm, errorMessage);
uploadForm.addEventListener('submit', formSubmit);
