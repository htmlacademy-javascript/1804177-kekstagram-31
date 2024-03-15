const bigPicture = document.querySelector('.big-picture');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');

const dataListFragment = document.createDocumentFragment();

const createCommentElementData = (comment) => {
  const pictureElement = socialComment.cloneNode(true);
  pictureElement.querySelector('.social__picture').src = comment.avatar;
  pictureElement.querySelector('.social__picture').alt = comment.name;
  pictureElement.querySelector('.social__text').textContent = comment.message;
  return pictureElement;
};

const renderComments = (comments) => {
  comments.forEach((comment) => {
    const picture = createCommentElementData(comment);
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
  renderComments(item.comments);
};

export {renderFullPictureDate};
