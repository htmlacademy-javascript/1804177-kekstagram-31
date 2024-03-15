import {isEscapeKey} from '../util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialComments = document.querySelector('.social__comments');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

export function openUserModal(evt) {
  if (evt.target.matches('.picture__img')) {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  }
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  socialComments.textContent = '';
  document.removeEventListener('keydown', onDocumentKeydown);
}

const modalClickHandler = () => {
  bigPictureClose.addEventListener('click', () => closeUserModal());
};

export {modalClickHandler};
