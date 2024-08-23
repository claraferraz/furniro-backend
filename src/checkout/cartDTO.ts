import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CartDTO {
  @ApiProperty({
    example: [
      { productId: 0, detailsId: 0, amount: 0 },
      { productId: 0, detailsId: 0, amount: 0 },
    ],
  })
  @IsArray()
  products?: Array<{
    productId: number;
    detailsId: number;
    amount: number;
  }>;
}
