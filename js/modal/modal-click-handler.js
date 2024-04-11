import {isEscapeKey} from '../util.js';
import {clearComments} from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseUserModal();
  }
};

function openUserModal(evt) {
  if (evt.target.matches('.picture__img')) {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }
  document.addEventListener('keydown', onDocumentKeydown);
}

function onCloseUserModal() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  socialComments.textContent = '';
  clearComments();
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureClose.addEventListener('click', () => onCloseUserModal());

export {openUserModal};
