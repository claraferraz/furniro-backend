import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './createUserDTO';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { LoginUserDTO } from './loginUserDTO';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

export interface UserLoginResponse {
  token?: string;
}

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getUserByEmail(email: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        password: false,
      },
    });

    return user;
  }

  async registerUser(payload: CreateUserDTO): Promise<UserLoginResponse> {
    const existingUser = await this.getUserByEmail(payload.email);

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
    const createdUser = await this.prisma.user.create({
      data: payload,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        password: false,
      },
    });
    return {
      token: this.jwtService.sign(createdUser, {
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

    const jwtPayload = {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username,
      role: existingUser.role,
    };

    return {
      token: this.jwtService.sign(jwtPayload, {
        secret: process.env.JWT_KEY,
      }),
    };
  }
}
