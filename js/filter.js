import {debounce} from './util.js';
import {renderFullPictureDate} from './modal/rendering-data.js';

const filters = document.querySelector('.img-filters');
const pictures = [];
const MAX_PICTURE_COUNT = 10;
const debounceRender = debounce(renderFullPictureDate);
const FILTER = {
  default: 'filter-default',
  rundom: 'filter-random',
  discussed: 'filter-discussed',
};

const onFilterChange = () => {
  filters.addEventListener('click', (evt) => {
    const filtersButtonActive = document.querySelector('.img-filters__button--active');
    if (!evt.target.matches('button')) {
      return;
    }

    filtersButtonActive.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    let fileterdPicture = [];
    if (evt.target.id === FILTER.default) {
      fileterdPicture = pictures;
    }
    if (evt.target.id === FILTER.rundom) {
      fileterdPicture = pictures.toSorted(() => 0.5 - Math.random()).slice(0, MAX_PICTURE_COUNT);
    }
    if (evt.target.id === FILTER.discussed) {
      fileterdPicture = pictures.filter((a, b) => b.comments.length - a.comments.length);
    }
    debounceRender(fileterdPicture);
  });
};


const configFilter = () => {
  filters.classList.remove('img-filters--inactive');
  filters.addEventListener('click', onFilterChange);
};

export {configFilter};
