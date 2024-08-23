import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDetailsDTO {
  @ApiProperty()
  @IsString()
  color?: string;

  @ApiProperty()
  @IsString()
  size?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
