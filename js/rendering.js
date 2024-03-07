import {userData} from './data.js';

const picturelist = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

const createUserData = userData();
const dataListFragment = document.createDocumentFragment();
createUserData.forEach(({url, description, comments, like}) => {
  const pictureElment = pictureTemplate.cloneNode(true);
  pictureElment.querySelector('.picture__img').src = url;
  pictureElment.querySelector('.picture__img').alt = description;
  pictureElment.querySelector('.picture__comments').textContent = comments;
  pictureElment.querySelector('.picture__likes').textContent = like;
  dataListFragment.appendChild(pictureElment);
});

const getPicture = () => picturelist.appendChild(dataListFragment);

export {getPicture};
