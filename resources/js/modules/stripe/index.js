import $$ from '@utilities/selectors';

const stripe = function(){
    if(!$$.stripeCheckoutBtn) return;

    $$.stripeCheckoutBtn.addEventListener('click', async function(e){
        e.preventDefault();
        const title = this.getAttribute('data-course-title');
        const price = this.getAttribute('data-price');
        const number = this.getAttribute('data-number');

        const response = await fetch('/.netlify/functions/stripeHandler', {
            method: 'POST',
            body: JSON.stringify({title, price, number}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        window.location.href = data.checkoutUrl;
    
    });
}();

export default stripe;