import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class ProductRegisterDTO {
  // product table
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  discount?: number;

  @IsBoolean()
  new?: boolean;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @IsUrl({}, { each: true })
  images: string[];
}
