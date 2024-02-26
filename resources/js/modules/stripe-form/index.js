import $$ from '@utilities/selectors';

const stripeForm = function(){
    if(!$$.stripeForm) return;

    const numberInput = $$.stripeForm.querySelector('input[name="number"]');

    $$.stripeForm.addEventListener('change', function(){
        const qty = numberInput.value;

        if(qty > 6){
            numberInput.nextSibling.textContent = 'You can only order 6 courses at a time.';
        }
    });

    $$.stripeForm.addEventListener('submit', async function(e){
        e.preventDefault();
        const number = this.number.value;
        const price = this.submit.getAttribute('data-price');
        const title = this.submit.getAttribute('data-course-title');
        const totalPrice = price * number

        const response = await fetch('/.netlify/functions/stripeHandler', {
            method: 'POST',
            body: JSON.stringify({title, totalPrice, number, price}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        window.location.href = data.checkoutUrl;
    
    })

}();

export default stripeForm;