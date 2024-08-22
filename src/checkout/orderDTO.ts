import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  total?: number;

  @IsArray()
  @IsString({ each: true })
  products?: string[];
}
