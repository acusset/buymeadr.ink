import { Controller, Post } from '@nestjs/common';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY, {
  apiVersion: '2020-08-27',
});

@Controller('session')
export class StripeSessionController {
  @Post()
  async getSessionId() {
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
      success_url: this.getBaseUrl() + '?success=true',
      cancel_url: this.getBaseUrl() + '?success=false',
    });

    return { id: session.id };
  }

  // Put in a service
  getBaseUrl(): string {
    const protocol = process.env.NODE_ENV == 'dev' ? 'http://' : 'https://';
    const port =
      process.env.HTTP_PORT == '80' ? '' : ':' + process.env.HTTP_PORT;
    return protocol + process.env.BASE_URL + port + '/';
  }
}
