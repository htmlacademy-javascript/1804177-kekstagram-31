import {createUserData} from '../data.js';

const bigPicture = document.querySelector('.big-picture');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');

const dataListFragment = document.createDocumentFragment();

const createElementData = (item) => {
  const pictureElement = socialComment.cloneNode(true);
  pictureElement.querySelector('.social__picture').src = item.avatar;
  pictureElement.querySelector('.social__picture').alt = item.name;
  pictureElement.querySelector('.social__text').textContent = item.message;
  return pictureElement;
};

const renderComments = (commentUser) => {
  commentUser.comments.forEach((item) => {
    const picture = createElementData(item);
    dataListFragment.appendChild(picture);
  });
  socialComments.appendChild(dataListFragment);
};

const renderFullPictureDate = (item) => {
  bigPicture.querySelector('.big-picture__img img').src = item.url;
  bigPicture.querySelector('.social__caption').textContent = item.description;
  bigPicture.querySelector('.social__comment-shown-count').textContent = item.comments.length;
  bigPicture.querySelector('.social__comment-total-count').textContent = item.comments.length;
  bigPicture.querySelector('.likes-count').textContent = item.like;
  renderComments(createUserData());
};

export {renderFullPictureDate};
