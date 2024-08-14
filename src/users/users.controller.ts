import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './createUserDTO';

@Controller('users')
export class UsersController {
  @Post('/register')
  create(
    @Body()
    createUserDTO: CreateUserDTO,
  ) {
    return createUserDTO;
  }
}
