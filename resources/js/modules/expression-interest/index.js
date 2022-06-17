import $$ from '@utilities/selectors';

const expressionInterest = function expressionInterest() {
    if(!$$.expressionInterestForm) return
        const timer = 12000
        const x = setTimeout(function(){
            $$.expressionInterestForm.classList.add('modal--active');
        }, timer)
}();

export default expressionInterest;