import {renderFullPictureDate} from './modal/rendering-data.js';
import {openUserModal} from './modal/modal-click-handler.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');
const dataListFragment = document.createDocumentFragment();

const createElementData = (item) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = item.url;
  pictureElement.querySelector('.picture__img').alt = item.description;
  pictureElement.querySelector('.picture__comments').textContent = item.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = item.like;
  pictureElement.addEventListener('click', (evt) => {
    renderFullPictureDate(item);
    openUserModal(evt);
  });
  return pictureElement;
};

const renderPictures = (userData) => {
  userData.forEach((item) => {
    const picture = createElementData(item);
    dataListFragment.appendChild(picture);
  });
  pictureList.appendChild(dataListFragment);
};

export {renderPictures};
