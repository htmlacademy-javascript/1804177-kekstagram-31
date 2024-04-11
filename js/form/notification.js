import { isEscapeKey } from '../util.js';

const body = document.body;

const onClickCloseNotification = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');
  if (evt.target === existElement || evt.target === closeButton) {
    existElement.remove();
    body.removeEventListener('click', onClickCloseNotification);
  }
};

const closeNotificationOnEscape = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  if (isEscapeKey(evt)) {
    existElement.remove();
    body.removeEventListener('keydown', closeNotificationOnEscape);
  }
};

const appendNotification = (template) => {
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', onClickCloseNotification);
  body.addEventListener('keydown', closeNotificationOnEscape);
};

export { appendNotification };
