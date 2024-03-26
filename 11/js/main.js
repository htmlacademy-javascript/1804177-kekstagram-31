import './util.js';
import {getUserData} from './data.js';
import {renderPictures} from './rendering.js';
import {modalClickHandler} from './modal/modal-click-handler.js';
import './form/form.js';
import './form/form-click-handler.js';
import './form/image-editor.js';

renderPictures(getUserData());
modalClickHandler();
