import './util.js';
import {getUserData} from './data.js';
import {renderPictures} from './rendering.js';
import {modalClickHandler} from './modal/modal-click-handler.js';

renderPictures(getUserData());
modalClickHandler();
