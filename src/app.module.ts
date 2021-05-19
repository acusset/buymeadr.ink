import { Module } from '@nestjs/common';
import { StripeModule } from './Stripe/StripeModule'

@Module({
  imports: [ StripeModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
