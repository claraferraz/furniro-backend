import {
  Body,
  Get,
  Request,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './createUserDTO';
import { UsersService } from './users.service';
import { LoginUserDTO } from './loginUserDTO';
import { AuthGuard } from './auth.guard';

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

  @Post('/login')
  async singin(
    @Body()
    loginUserDTO: LoginUserDTO,
  ) {
    return await this.userService.loginUser(loginUserDTO);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
