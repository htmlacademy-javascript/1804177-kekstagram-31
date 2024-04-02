import {initialRenderComments} from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');

const renderFullPictureDate = (item) => {
  bigPicture.querySelector('.big-picture__img img').src = item.url;
  bigPicture.querySelector('.social__caption').textContent = item.description;
  bigPicture.querySelector('.social__comment-total-count').textContent = item.comments.length;
  bigPicture.querySelector('.likes-count').textContent = item.likes;
  initialRenderComments(item.comments);
};

export {renderFullPictureDate};
