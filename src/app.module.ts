import { Module } from '@nestjs/common';
import { StripeSessionController } from './Session/StripeSessionController';

@Module({
  imports: [],
  controllers: [StripeSessionController],
  providers: [],
})
export class AppModule {}
