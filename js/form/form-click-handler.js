import {isEscapeKey} from '../util.js';
import {resetValues} from './image-editor.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadPreview = uploadForm.querySelector('.img-upload__preview img');
const uploadEffectsPreview = uploadForm.querySelectorAll('.effects__preview');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      closeUploadModal();
    }
  }
};

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  uploadPreview.src = URL.createObjectURL(file);
  uploadEffectsPreview.forEach((elem) => {
    elem.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });

  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCancel.addEventListener('click', closeUploadModal);
  document.addEventListener('keydown', onDocumentKeydown);
});


function closeUploadModal() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancel.removeEventListener('click', closeUploadModal);
  uploadForm.reset();
  resetValues();
}

export {closeUploadModal};
