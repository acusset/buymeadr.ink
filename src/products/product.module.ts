import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductController],
  providers: [ProductsService],
})
export class ProductModule {}
