const socialComments = document.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-shown-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');
const dataListFragment = document.createDocumentFragment();
let renderHandler;

const createCommentElement = (comment) => {
  const commentElement = socialComment.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const renderCommentsToDataList = (slicedComments) => {
  slicedComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    dataListFragment.appendChild(commentElement);
  });
};

const renderComments = (currentComment) => {
  socialComments.innerHTML = '';
  let currentCount = 0;
  let comments = [];

  return () => {
    comments = currentComment;
    const COUNT_STEP = 5;
    const slicedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
    const currentCommentsCount = String(slicedComments.length + currentCount);

    renderCommentsToDataList(slicedComments);
    socialComments.appendChild(dataListFragment);
    socialCommentCount.textContent = currentCommentsCount;

    if (currentCommentsCount >= comments.length) {
      socialCommentsLoader.classList.add('hidden');
    }
    currentCount += COUNT_STEP;
  };
};

const initialRenderComments = (currentComment) => {
  const render = renderComments(currentComment);
  renderHandler = render;
  render();

  socialCommentsLoader.addEventListener('click', render);
};

const clearComments = () => {
  socialComments.innerHTML = '';
  socialCommentCount.textContent = 0;
  socialCommentsLoader.classList.remove('hidden');
  socialCommentsLoader.removeEventListener('click', renderHandler);
};

export {initialRenderComments, clearComments};
