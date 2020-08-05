import $$ from '@utilities/selectors';

function loopThroughChildren(parent, className) {
  if ( !parent || !className || !parent.childNodes.length) {
    console.log("Please check if all correct arguments are provided for loopThroughChildren() function!");
    return;
  }
  for (let i = 0; i < parent.childNodes.length; i++ ) {
    if (parent.childNodes[i].classList.contains(className)) {
      return parent.childNodes[i];
    }
  }
}

const ShowHide = function ShowHide() {
  let parentNode,
      content,
      iconUp,
      iconDown;

  $$.toggleShowHide.forEach(btn => {
    btn.addEventListener('click', function(e) {
      parentNode = this.parentNode;

      content = loopThroughChildren(parentNode, 'footer-dropdown-content');

      if (!content) return;

      iconDown = loopThroughChildren(this, 'fa-angle-down');
      iconUp = loopThroughChildren(this, 'fa-angle-up');

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