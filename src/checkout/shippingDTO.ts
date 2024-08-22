import { IsNotEmpty, IsString } from 'class-validator';

export class ShippingDTO {
  @IsString()
  companyName?: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  addOnAddress?: string;

  @IsString()
  information?: string;
}
