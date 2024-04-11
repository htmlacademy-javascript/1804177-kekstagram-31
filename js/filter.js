import {debounce} from './util.js';
import {renderPictures} from './rendering.js';

const FILTERS_CONTAINER = document.querySelector('.img-filters');
const MAX_PICTURE_COUNT = 10;
const debounceRenderPictures = debounce(renderPictures);
const FILTER_TYPES = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const onFilterChange = (evt, pictures) => {
  const activeFilterButton = document.querySelector('.img-filters__button--active');
  if (!evt.target.matches('button')) {
    return;
  }

  activeFilterButton.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');

  let filteredPictures = [];
  const filterId = evt.target.id;

  switch (filterId) {
    case FILTER_TYPES.default:
      filteredPictures = pictures;
      break;
    case FILTER_TYPES.random:
      filteredPictures = pictures.toSorted(() => 0.5 - Math.random()).slice(0, MAX_PICTURE_COUNT);
      break;
    case FILTER_TYPES.discussed:
      filteredPictures = pictures.toSorted((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      filteredPictures = pictures;
  }

  debounceRenderPictures(filteredPictures);
};

const configureFilters = (pictures) => {
  FILTERS_CONTAINER.classList.remove('img-filters--inactive');
  FILTERS_CONTAINER.addEventListener('click', (evt) => onFilterChange(evt, pictures));
};

export {configureFilters};
