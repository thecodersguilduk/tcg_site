import $$ from '@utilities/selectors';

const expressionInterest = function expressionInterest() {
    if(!$$.expressionInterestForm) { return }

    const timer = 12000
    const x = setTimeout(function(){
        $$.expressionInterestForm.classList.add('modal--active');
    }, timer)

    const closeBtn =$$.expressionInterestForm.querySelector('.modal-close');

    closeBtn.addEventListener('click', function(){
        $$.expressionInterestForm.classList.remove('modal--active');
    })
}();

export default expressionInterest;