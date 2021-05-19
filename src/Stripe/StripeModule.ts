import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { StripeSessionController } from './Controller/StripeSessionController';
import { CrossOriginResourceSharingMiddleware } from './Middleware/CrossOriginRequestSharingMiddleware';

@Module({
  controllers: [ StripeSessionController ],
  providers: [],
})
export class StripeModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(CrossOriginResourceSharingMiddleware)
        .forRoutes(StripeSessionController);
    }
}