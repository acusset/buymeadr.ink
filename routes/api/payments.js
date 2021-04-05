const stripe = require('stripe')(process.env.STRIPE_SECRET_API_KEY);
const router = require('express').Router();

/** Create paiment session */
router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        description: 'A pint of fresh beer of my choice.',
        price_data: {
          currency: 'sgd',
          product_data: {
            name: 'Beer',
          },
          unit_amount: 1200,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: getBaseUrl() + 'success',
    cancel_url: getBaseUrl() + 'cancel',
  });

  res.json({id: session.id});
});

function getBaseUrl () {
  const protocol = process.env.NODE_ENV == 'dev' ? 'http://' : 'https://';
  const port = process.env.HTTP_PORT == '80' ? '' : (':'+ process.env.HTTP_PORT);
  
  return protocol + process.env.BASE_URL + port + '/';
}

module.exports = router;
