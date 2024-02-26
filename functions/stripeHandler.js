const stripe = require('stripe')(process.env.STRIPE_LIVE_SECRET_KEY);

exports.handler = async (event) => {
    try {
      // Retrieve the event data from the request body
      const {title, totalPrice, price, number} = JSON.parse(event.body);

    // Create a checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'gbp',
                product_data: {
                    name: title,
                },
                unit_amount: price,
            },
            quantity: number,
        }],
        mode: 'payment',
        success_url: 'https://www.thecodersguild.org.uk/success.html',
        cancel_url: 'https://www.thecodersguild.org.uk/went_wrong.html',
      });

      //Send details to Monday.com board
  
      // Respond with a 200 status code to acknowledge receipt of the event
      return {
        statusCode: 200,
        body: JSON.stringify({ sessionId: session.id, checkoutUrl: session.url }),
      };
    } catch (error) {
      // Handle any errors
      console.error('Error handling webhook event:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'An error occurred while creating the session.' }),
      };
    }
  };