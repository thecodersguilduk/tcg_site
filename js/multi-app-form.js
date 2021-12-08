const opportunity = document.getElementById('opportunity');
const questions = Array.from(document.querySelectorAll(".question"));
// var fieldsets = jQuery('.application-form--fieldset.active');
// var fieldset = fieldsets[0];
// var fieldsetName = jQuery(fieldset).data('fieldset');
var validationInputs = objInputs.map(item => item.fields);
console.log(validationInputs);


opportunity.addEventListener('change', e => {
    const value = join(e.target.value);
    
    
    questions.forEach(question => {
        const classList = Array.from(question.classList);
      

        if(!classList.includes('all') && !classList.includes(value)){
            question.classList.remove('block');
            question.classList.add('hidden');
            const label = question.querySelector('label').htmlFor;
            ///console.log(label);

            validationInputs.forEach(item => {
                for(const key in item){
                    if(key === label){
                        item[key].required = false;
                        console.log(item[key].required);
                    }
                }
            })


            const remainingEls = Array.from(question.parentNode.children).filter(item => !Array.from(item.classList).includes('hidden'));
            if(remainingEls.length > 0){
                remainingEls[0].classList.remove('mt-8');
            }
            
        } else {
            question.classList.add('block');
            question.classList.remove('hidden');
            const previousSibling = question.previousElementSibling;
            if(!previousSibling){
                question.nextElementSibling.classList.add("mt-8");
            }
        }    
    });
});


function join(string) {
return string.replace(/\s+/g, '-').toLowerCase();
}
