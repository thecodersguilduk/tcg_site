import $$ from '@utilities/selectors'

function displayEl(el, attr, hiddenClass) {
  el.classList.contains(hiddenClass) ? el.classList.remove(hiddenClass) : null;
  el.hasAttribute(attr) ? el.setAttribute(attr, 'false') : null;
}

const loadMorePosts = function loadMorePosts() {
  const maxItems = 9,
        hiddenClass = 'hidden',
        blogPostsArray = Array.from($$.blogPostList),
        attr = 'aria-hidden';

  if (!$$.postContainer) { return; }

  blogPostsArray.splice(0, maxItems).forEach(el => {
    displayEl(el, attr, hiddenClass);
  })

  $$.loadMoreBtn.addEventListener('click', function() {

    blogPostsArray.splice(0, maxItems).forEach(el => {
      displayEl(el, attr, hiddenClass);
    })

    displayEl($$.scrollTopBtn, attr, hiddenClass);

    if (!blogPostsArray.length) {
      this.classList.add(hiddenClass);
      this.setAttribute(attr, true);
    }
  })

  $$.scrollTopBtn.addEventListener('click', function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  })

}()

export default loadMorePosts;

