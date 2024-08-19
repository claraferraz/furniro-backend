import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ProductRegisterDTO } from './productRegisterDTO';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/users/auth.guard';
import { ProductDetailsDTO } from './productDetailsDTO';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(AuthGuard)
  @Post('/register')
  async create(
    @Body()
    productRegisterDTO: ProductRegisterDTO,
  ) {
    return await this.productsService.registerBaseProduct(productRegisterDTO);
  }

  @UseGuards(AuthGuard)
  @Post('/register/:productId')
  async createDetails(
    @Body()
    productDetailsDTO: ProductDetailsDTO,
    @Param('productId') id: number,
  ) {
    return await this.productsService.registerProductDetails(
      productDetailsDTO,
      id,
    );
  }
  /*
  //pegar produtos sem filtro
  @Get('/')

  //pegar produtos por filtro
  @Get('/:filter')

  //pegar produto por id
  @Get('/productId')
*/
}
