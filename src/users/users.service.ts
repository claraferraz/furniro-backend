import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './createUserDTO';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { LoginUserDTO } from './loginUserDTO';
import { JwtService } from '@nestjs/jwt';

export interface UserLoginResponse {
  token?: string;
}

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registerUser(payload: CreateUserDTO): Promise<UserLoginResponse> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('user already exists', {
        cause: new Error(),
        description: 'email already registered',
      });
    }

    const hash = await this.encryptPassword(payload.password, 10);
    //save the user in the db
    payload.password = hash;
    //return id, username and email
    await this.prisma.user.create({
      data: payload,
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    return {
      token: this.jwtService.sign(payload.email, {
        secret: process.env.JWT_KEY,
      }),
    };
  }

  async encryptPassword(rawPassword, saltRound) {
    //save the user password encrypted - bcryptjs
    return await bcrypt.hash(rawPassword, saltRound);
  }

  async loginUser(payload: LoginUserDTO): Promise<UserLoginResponse> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    const result = await bcrypt.compare(
      payload.password,
      existingUser.password,
    );

    if (!result) {
      throw new BadRequestException('user not found', {
        cause: new Error(),
        description: 'email or password are not correct',
      });
    }
    return {
      token: this.jwtService.sign(payload.email, {
        secret: process.env.JWT_KEY,
      }),
    };
  }
}
