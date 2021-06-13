import { Controller, Post, Body, Header, Options } from '@nestjs/common';
import { StripeService } from 'src/stripe/stripe.service';
import { Product, GetProduct } from 'src/products/product.model';
import { ProductsService } from 'src/products/products.service';
import Stripe from 'stripe';

@Controller('stripe')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private productService: ProductsService,
  ) {}

  @Post('/session')
  private async createSession(@Body() productDTO: GetProduct) {
    let product: Product = this.productService.findOneById(productDTO.id);
    let session: Stripe.Response<Stripe.Checkout.Session> = await this.stripeService.createSession(
      product,
    );

    return session;
  }
}
