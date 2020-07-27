import $$ from '@utilities/selectors';

const headerScroll = function headerScroll() {
  window.addEventListener('scroll', function() {
    if ( window.scrollY > 0 ) {
      $$.header.classList.add('bg-white', 'shadow');
    } else {
      $$.header.classList.remove('bg-white', 'shadow');
    }
  });
}();

export default headerScroll;