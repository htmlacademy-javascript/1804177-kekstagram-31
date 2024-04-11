import {renderFullPictureDate} from './modal/rendering-data.js';
import {openUserModal} from './modal/modal-click-handler.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');
const dataListFragment = document.createDocumentFragment();

const createPictureElementData = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.addEventListener('click', (evt) => {
    renderFullPictureDate(picture);
    openUserModal(evt);
  });
  return pictureElement;
};

const renderPictures = (pictures) => {
  clearList();
  pictures.forEach((picture) => {
    const renderPicture = createPictureElementData(picture);
    dataListFragment.appendChild(renderPicture);
  });
  pictureList.appendChild(dataListFragment);
};

function clearList() {
  document.querySelectorAll('a.picture').forEach((element) => element.remove());
}

export {renderPictures};
