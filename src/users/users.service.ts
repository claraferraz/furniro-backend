import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './createUserDTO';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

export interface UserRegisterResponse {
  id: string;
  username: string;
  email: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async registerUser(payload: CreateUserDTO): Promise<UserRegisterResponse> {
    const hash = await this.encryptPassword(payload.password, 10);
    //save the user in the db
    payload.password = hash;
    //return id, username and email
    return await this.prisma.user.create({
      data: payload,
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  async encryptPassword(rawPassword, saltRound) {
    //save the user password encrypted - bcryptjs
    return await bcrypt.hash(rawPassword, saltRound);
  }
}
