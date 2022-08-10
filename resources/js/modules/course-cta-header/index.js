import $$ from '@utilities/selectors';

const courseCTAHeader = function courseCTAHeader(){
    const coursePage = document.getElementById('course');

    if(!coursePage) return;

    const header = $$.header;

    document.addEventListener('scroll', function(e){
        const scroll = window.scrollY;

        if(scroll > 125){
            header.style.height = '0';
            header.style.overflow = 'hidden';
        } else {
            header.style.height = 'unset';
            header.style.overflow = 'unset';
        }

    })
}();

export default courseCTAHeader;