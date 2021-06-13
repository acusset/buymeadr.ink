import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [StripeModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
