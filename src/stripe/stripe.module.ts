import { Module } from '@nestjs/common';
import { StripeService } from 'src/stripe/stripe.service';
import { StripeController } from 'src/stripe/stripe.controller';
import { ProductsService } from 'src/products/products.service';

@Module({
  controllers: [StripeController],
  providers: [StripeService, ProductsService],
})
export class StripeModule {}
