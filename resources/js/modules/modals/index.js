import $$ from '@utilities/selectors'

const displayModal = function displayModal() {
  let btn,
      dataAttr,
      modal;

  document.addEventListener('click', function(e) {

    
    btn = e.target.closest('[data-modal]'); 
    
    if ( !btn ) { return; }
    
    e.preventDefault();
    
    dataAttr = btn.hasAttribute('data-modal') ? btn.getAttribute('data-modal') : null;

    if ( !dataAttr ) { return; }

    modal = document.querySelector(`#${dataAttr}`);

    if ( !modal ) { return; }

    modal.classList.toggle('modal--active');

  });

}();

export default displayModal;