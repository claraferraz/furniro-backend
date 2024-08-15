import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}
