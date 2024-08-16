import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDetailsDTO {
  @IsNumber()
  @IsNotEmpty()
  tags: number;

  //product details table
  @IsString()
  color?: string;

  @IsString()
  size?: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsNumber()
  @IsNotEmpty()
  sku: number;
}
