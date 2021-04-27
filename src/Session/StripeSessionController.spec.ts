import { Test, TestingModule } from '@nestjs/testing';
import { StripeSessionController } from './StripeSessionController';

describe('CatsController', () => {
  let controller: StripeSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripeSessionController],
    }).compile();

    controller = module.get<StripeSessionController>(StripeSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
