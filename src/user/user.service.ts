import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Provider } from 'src/provider/entities/provider.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('PROVIDER_REPOSITORY')
    private readonly providerRepository: Repository<Provider>,
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

  async findUserProviders(loggedInUserId: string) {
    const loggedInUser: User = await this.findOne(loggedInUserId);
    return await this.providerRepository.find({
      where: {
        user: loggedInUser,
      },
    });
  }

  findOne(id: string) {
    return this.userRepository.findOne(id).catch(() => {
      throw new NotFoundException('User not found');
    });
  }

  async update(id: string, payload: UpdateUserDto) {
    const user: User = await this.findOne(id);
    Object.assign(user, payload);
    await user.save();
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getByCredentials(email: string, password: string) {
    return this.userRepository.findOne({
      email,
      password: crypto.createHash('sha256').update(password).digest('hex'),
    });
  }
}
