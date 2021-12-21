const opportunity = document.getElementById('opportunity');
const questions = Array.from(document.querySelectorAll(".question"));
let validationInputs = objInputs.map(item => item.fields);

opportunity.addEventListener('change', e => {
    const value = join(e.target.value);
    console.log(value);
    changeNameAttr(value);
    questions.forEach(question => {
        const classList = Array.from(question.classList);
      

        if(!classList.includes('all') && !classList.includes(value)){
            question.classList.remove('block');
            question.classList.add('hidden');
            const label = question.querySelector('label').htmlFor;

            validationInputs.forEach(item => {
                for(const key in item){
                    if(key === label){
                        item[key].required = false;
                    } 
                }
            });


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

function changeNameAttr(value){
    //value is the joined value from the opportunity field
    const form = document.getElementById("applicationForm");
    switch (value) {
        case 'leeds-digital-marketing-apprentice': 
            form.action = "https://formspree.io/f/xeqnqera";
            break;
        case 'yorkshire-sales-executive-apprentice': 
            form.action = "https://formspree.io/f/xvolozww";
            break;
        case 'leeds-business-admin-apprentice': 
            form.action = "https://formspree.io/f/xrgjgeyr";
            break;
        case 'manchester-business-admin-apprentice': 
            form.action = "https://formspree.io/f/mbjwjdzw";
            break;
        case 'technical-trainer': 
            form.action = "https://formspree.io/f/xnqwqjgr";
            break;
        default:
            form.action = "https://formspree.io/f/xdoboawr";
            break;
    }
}
