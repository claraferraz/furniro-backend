import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './createUserDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/register')
  async create(
    @Body()
    createUserDTO: CreateUserDTO,
  ) {
    return await this.userService.registerUser(createUserDTO);
  }
}
