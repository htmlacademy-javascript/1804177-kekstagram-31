const socialComments = document.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-shown-count');
const socialCommentLosader = document.querySelector('.social__comments-loader');
const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];
const dataListFragment = document.createDocumentFragment();

const createCommentElementData = (comment) => {
  const commentElement = socialComment.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const renderComments = () => {
  const arrComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const arrCommentsLength = arrComments.length + currentCount;

  arrComments.forEach((comment) => {
    const commentElement = createCommentElementData(comment);
    dataListFragment.appendChild(commentElement);
  });

  socialComments.appendChild(dataListFragment);
  socialCommentCount.textContent = arrCommentsLength;

  if (arrCommentsLength >= comments.length) {
    socialCommentLosader.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
};

const renderComment = (currentComment) => {
  comments = currentComment;
  renderComments();
  socialCommentLosader.addEventListener('click', renderComments);
};

const clearComments = () => {
  currentCount = 0;
  socialCommentLosader.classList.remove('hidden');
  socialCommentLosader.removeEventListener('click', renderComment);
};

export {renderComment, clearComments};
