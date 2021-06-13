import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/product.model';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY, {
      apiVersion: '2020-08-27',
    });
  }

  // Todo create a session from a cart
  public async createSession(product: Product) {
    return await this.stripe.checkout.sessions.create({
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
      success_url: process.env.FRONT_URL + '?success=true',
      cancel_url: process.env.FRONT_URL + '?success=false',
    });
  }
}
