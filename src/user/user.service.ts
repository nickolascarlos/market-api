import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Provider } from 'src/provider/entities/provider.entity';

@Injectable()
export class UserService {
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

  async findUserProviders(loggedInUserId: string, offset: number = 0, limit: number = Infinity) {
    const loggedInUser: User = await this.findOne(loggedInUserId);
    return await Provider.find({
      where: {
        user: loggedInUser,
      },
      skip: offset,
      take: limit,
    });
  }

  findOne(id: string) {
    return User.findOne(id).catch(() => {
      throw new NotFoundException('User not found');
    });
  }

  async update(id: string, payload: UpdateUserDto) {
    const user: User = await this.findOne(id);
    Object.assign(user, payload);
    await user.save();
    return user;
  }

  async remove(id: string) {
    const user: User = await this.findOne(id);
    await user.remove();
    return 'removed';
  }

  getByCredentials(email: string, password: string) {
    return User.findOne({
      email,
      password: crypto.createHash('sha256').update(password).digest('hex'),
    });
  }
}
