import {showErrorMessage} from './util.js';
import {renderPictures} from './rendering.js';
import './modal/modal-click-handler.js';
import './form/form.js';
import './form/form-click-handler.js';
import './form/image-editor.js';
import {getData} from './api.js';

const bootstrap = async () => {
  try {
    const getPictures = await getData();
    renderPictures(getPictures);
  } catch (error) {
    showErrorMessage(error.message);
  }
};

await bootstrap();
