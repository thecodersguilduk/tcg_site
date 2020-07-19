import $$ from '@utilities/selectors';

const ShowHide = function ShowHide() {
  let content,
      chevron;

  $$.toggleShowHide.forEach(btn => {
    btn.addEventListener('click', function(e) {
      content = this.nextElementSibling;
      content.maxHeight = content.scrollHeight;

      for ( let i = 0; i < this.childNodes.length; i++ ) {
        if (this.childNodes[i].classList.contains('chevron')) {
          chevron = this.childNodes[i];
        }
      }
  
      if (!content.style.maxHeight) {
        chevron.classList.remove('fa-chevron-down');
        chevron.classList.add('fa-chevron-up');
        content.style.maxHeight = `${content.maxHeight}px`;
      } else {
        chevron.classList.add('fa-chevron-down');
        chevron.classList.remove('fa-chevron-up');
        content.style.maxHeight = null;
      }

    });
  });
}();

export default ShowHide