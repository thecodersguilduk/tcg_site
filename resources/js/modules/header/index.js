import $$ from '@utilities/selectors';

const headerScroll = function headerScroll() {
  window.addEventListener('scroll', function() {
    if ( window.scrollY > 0 ) {
      $$.header.classList.add('bg-white', 'shadow-md');
    } else {
      $$.header.classList.remove('bg-white', 'shadow-md');
    }
  });
}();

export default headerScroll;