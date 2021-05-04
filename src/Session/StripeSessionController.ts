import { Controller, Post, Body, Header, Options } from '@nestjs/common';
import Product from '../Product';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY, {
  apiVersion: '2020-08-27',
});

@Controller('session')
export class StripeSessionController {
  @Post()
  @Header('Access-Control-Allow-Origin', process.env.FRONT_URL)
  @Header('Access-Control-Allow-Headers', 'Accept, Content-Type')
  async getSessionId(@Body() product: Product) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          description: product.description,
          price_data: {
            currency: 'sgd',
            product_data: {
              name: product.name,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://' + process.env.FRONT_URL + '/?success=true',
      cancel_url: 'https://' + process.env.FRONT_URL + '?success=false',
    });

    return { id: session.id };
  }

  // Handles Preflight CORS Requests
  @Options()
  @Header('Access-Control-Allow-Origin', process.env.FRONT_URL)
  @Header('Access-Control-Allow-Headers', 'Accept, Content-Type')
  async preflight() {}
}
