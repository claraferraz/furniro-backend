import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductRegisterDTO } from './productRegisterDTO';
import { ProductsService, TagsDTO } from './products.service';
import { AdminGuard } from 'src/users/admin.guard';
import { ProductDetailsDTO } from './productDetailsDTO';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(AdminGuard)
  @Post('/register')
  async create(
    @Body()
    productRegisterDTO: ProductRegisterDTO,
  ) {
    return await this.productsService.registerBaseProduct(productRegisterDTO);
  }

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Post('/tags/register')
  async createTags(@Body() tags: TagsDTO) {
    return await this.productsService.registerTags(tags);
  }

  //pegar produtos sem filtro
  @Get('/')
  async getProducts(
    @Query('page') page: number,
    @Query('offset') offset: number,
    @Query('order') order: string,
  ) {
    return await this.productsService.getProductsList(order, page, offset);
  }

  @Get('/:productId')
  async getProduct(@Param('productId') id: number) {
    return await this.productsService.getProductById(id);
  }
}
