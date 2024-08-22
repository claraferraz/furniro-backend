import {
  Body,
  Request,
  Controller,
  Post,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/users/auth.guard';
import { ShippingDTO } from './shippingDTO';
import { CheckoutService } from './checkout.service';
import { CartDTO } from './cartDTO';

@Controller('checkout')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  @UseGuards(AuthGuard)
  @Post('/registerCart')
  async createCart(@Body() cartDTO: CartDTO, @Request() req) {
    const user = req.user;

    const data = await this.checkoutService.createCartOrder(cartDTO, user);
    return data;
  }

  @UseGuards(AuthGuard)
  @Post('/:orderId')
  async placeOrder(
    @Body() shippingDTO: ShippingDTO,
    @Request() req,
    @Param('orderId') orderId: string,
  ) {
    const user = req.user;
    return await this.checkoutService.registerShippingOrder(
      shippingDTO,
      user,
      orderId,
    );
  }
}
