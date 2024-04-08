import {showErrorMessage} from '../util.js';

const uploadPreviewImage = document.querySelector('.img-upload__preview img');
const uploadEffectsPreviews = document.querySelectorAll('.effects__preview');

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'tiff'];
const ERROR_MESSAGE = 'Неверный тип файла';

const uploadPhoto = (inputElement) => {
  const file = inputElement.files[0];
  const fileName = file.name.toLowerCase();
  const fileExtension = fileName.split('.').pop();
  const isValidFileType = FILE_TYPES.includes(fileExtension);

  const displayImagePreview = () => {
    const imageUrl = URL.createObjectURL(file);
    uploadPreviewImage.src = imageUrl;
    uploadEffectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${imageUrl})`;
    });
  };

  if (isValidFileType) {
    displayImagePreview();
    return true;
  } else {
    showErrorMessage(ERROR_MESSAGE);
    return false;
  }
};

export {uploadPhoto};
