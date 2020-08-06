import $$ from '@utilities/selectors';

function getChildren(parent, className) {
  let child;
  if ( !parent || !className || !parent.childNodes.length) {
    console.log("Please check if all correct arguments are provided for loopThroughChildren() function!");
    return;
  }

  let children = Array.from(parent.childNodes);

  children.map(childEl => {
    if (childEl.classList.contains(className)) {
      child = childEl;
    }
  });

  return child;
}

const ShowHide = function ShowHide() {
  let parentNode,
      content,
      iconUp,
      iconDown;

  $$.toggleShowHide.forEach(btn => {
    btn.addEventListener('click', function(e) {
      parentNode = this.parentNode;

      content = getChildren(parentNode, 'footer-dropdown-content');

      if (!content) return;

      iconDown = getChildren(this, 'fa-angle-down');
      iconUp = getChildren(this, 'fa-angle-up');

      content.maxHeight = content.scrollHeight;
  
      if (!content.style.maxHeight) {
        iconDown.classList.remove('fa-angle-down');
        iconDown.classList.add('fa-angle-up');
        content.classList.remove('opacity-0');
        content.style.maxHeight = `${content.maxHeight}px`;
      } else {
        iconUp.classList.add('fa-angle-down');
        iconUp.classList.remove('fa-angle-up');
        content.classList.add('opacity-0');
        content.style.maxHeight = null;
      }
    });
  });
}();

export default ShowHide