import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDetailsDTO {
  @IsString()
  color?: string;

  @IsString()
  size?: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
