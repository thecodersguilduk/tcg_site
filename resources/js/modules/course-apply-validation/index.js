import $$ from '@utilities/selectors';

const courseApplyValidation = function courseApplyValidation() {
    if(!$$.courseApply) return
    const submitBtn = $$.applyBtnSubmit;
    const form = document.forms.namedItem('courseApply');

    form.addEventListener('change', function(e){
        let input = e.target.closest('.form-input-field') || e.target.closest('.form-checkbox');

        if(!input) return

        if(input.type === 'radio' || input.type === 'checkbox'){
            input = form.querySelectorAll(`input[name='${input.name}']`);
            input.forEach(item => {
                item.setAttribute('data-valid', true);
            })
        } else {
            input.value !== '' ? input.setAttribute('data-valid', true) : input.setAttribute('data-valid', false);
        }

        let invalidInputs = this.querySelectorAll('[data-valid="false"]');

        if(submitBtn){
          submitBtn.disabled = invalidInputs.length > 0 ? true : false;
        }

      })
}();

export default courseApplyValidation;