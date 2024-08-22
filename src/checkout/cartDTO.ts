import { IsArray } from 'class-validator';

export class CartDTO {
  @IsArray()
  products?: Array<{
    productId: number;
    detailsId: number;
    amount: number;
  }>;
}
