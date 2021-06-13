import { Controller, Get, Param } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private productsService: ProductsService) {}

  @Get()
  public getAllProducts(): Product[] {
    return this.productsService.findAll();
  }

  @Get('/:id')
  public getOne(@Param('id') id: string): Product {
    return this.productsService.findOneById(id);
  }
}
