const opportunity = document.getElementById('opportunity');
const questions = Array.from(document.querySelectorAll(".question"));

opportunity.addEventListener('change', e => {
    const value = join(e.target.value);
    
    
    questions.forEach(question => {
        const classList = Array.from(question.classList);
        

        if(!classList.includes('all') && !classList.includes(value)){
            question.classList.remove('block');
            question.classList.add('hidden');

            const remainingEls = Array.from(question.parentNode.children).filter(item => !Array.from(item.classList).includes('hidden'));
            remainingEls[0].classList.remove('mt-8');
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
