import { Inject, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ParseUUIDPipe } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserDto) {
    const newUser = new User();
    Object.assign(newUser, {
      ...payload,
      password: crypto
        .createHash('sha256')
        .update(payload.password)
        .digest('hex'),
    });
    await newUser.save();
    delete newUser.password;
    return newUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(id: string, payload: UpdateUserDto) {
    const user: User = await this.findOne(id);
    Object.assign(user, payload);
    await user.save();
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
