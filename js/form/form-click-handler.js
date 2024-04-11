import {isEscapeKey} from '../util.js';
import {resetValues} from './image-editor.js';
import {uploadPhoto} from './upload-photo.js';
import {resetErrors} from './form.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadInput = uploadForm.querySelector('.img-upload__input');
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
      onCloseUploadModal();
    }
  }
};

uploadInput.addEventListener('change', () => {
  if (uploadPhoto(uploadInput)) {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadCancel.addEventListener('click', onCloseUploadModal);
    document.addEventListener('keydown', onDocumentKeydown);
  }
});


function onCloseUploadModal() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancel.removeEventListener('click', onCloseUploadModal);
  uploadForm.reset();
  resetErrors();
  resetValues();
}

export {onCloseUploadModal};
