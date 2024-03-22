import $$ from '@utilities/selectors';

const faqAccordion = function faqAccordion() {
  if (!$$.faqSection) return;

  $$.faqSection.addEventListener('click', function(e) {
    let btn = e.target.closest('.faq-btn');

    if (!btn) return;

    let content = btn.nextElementSibling;
    //let angle = btn.querySelector('.svg-inline--fa');

    btn.classList.contains('faq-btn--active') ? btn.classList.remove('faq-btn--active') : btn.classList.add('faq-btn--active');

    if (content.style.maxHeight) {
      //angle.classList.add('fa-angle-down');
      //angle.classList.remove('fa-angle-up');
      content.style.maxHeight = null;
      content.style.padding = null;
    } else {
      //angle.classList.remove('fa-angle-down');
      //angle.classList.add('fa-angle-up');
      content.style.padding = '3rem';
      content.style.maxHeight = `${content.scrollHeight + 96}px`;

    }
  })
}();

export default faqAccordion;