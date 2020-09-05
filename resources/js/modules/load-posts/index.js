import $$ from '@utilities/selectors'

function displayPost(arr, attr, hiddenClass, limit) {
  arr.splice(0, limit).forEach(el => {
    el.classList.contains(hiddenClass) ? el.classList.remove(hiddenClass) : null;
    el.hasAttribute(attr) ? el.setAttribute(attr, 'false') : null;
  })
}

const loadMorePosts = function loadMorePosts() {
  const maxItems = 9,
        hiddenClass = 'hidden',
        blogPostsArray = Array.from($$.blogPostList),
        attr = 'aria-hidden';

  if (!$$.postContainer) { return; }

  displayPost(blogPostsArray, attr, hiddenClass, maxItems);

  $$.loadMoreBtn.addEventListener('click', function(e) {

    displayPost(blogPostsArray, attr, hiddenClass, maxItems);

    $$.scrollTopBtn.classList.contains('hidden') ? $$.scrollTopBtn.classList.remove('hidden') : null;

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

