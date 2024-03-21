const socialComments = document.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-shown-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');
const dataListFragment = document.createDocumentFragment();

const createCommentElement = (comment) => {
  const commentElement = socialComment.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const renderComments = (currentComment) => {
  let currentCount = 0;
  let comments = [];
  return () => {
    comments = currentComment;
    const COUNT_STEP = 5;
    const arrComments = comments.slice(currentCount, currentCount + COUNT_STEP);
    const arrCommentsLength = arrComments.length + currentCount;
    arrComments.forEach((comment) => {
      const commentElement = createCommentElement(comment);
      dataListFragment.appendChild(commentElement);
    });

    socialComments.appendChild(dataListFragment);
    socialCommentCount.textContent = arrCommentsLength;
    if (arrCommentsLength >= comments.length) {
      socialCommentsLoader.classList.add('hidden');
    }
    currentCount += COUNT_STEP;
  };
};

const initialRenderComments = (currentComment) => {
  const render = renderComments(currentComment);

  socialCommentsLoader.addEventListener('click', render);
};
const clearComments = () => {
  socialComments.innerHTML = '';
  socialCommentCount.textContent = 0;
  socialCommentsLoader.classList.remove('hidden');
  socialCommentsLoader.removeEventListener('click', initialRenderComments);
};

export {initialRenderComments, clearComments};
