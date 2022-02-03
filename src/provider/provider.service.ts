import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProviderService {
  constructor(private readonly userService: UserService) {}

  async create(payload: CreateProviderDto, userId: string) {
    const newProvider = new Provider();
    const owner: User = await this.userService.findOne(userId);
    Object.assign(newProvider, {
      ...payload,
      user: owner,
    });
    await newProvider.save();
    delete newProvider.user;
    return newProvider;
  }

  findAll() {
    return `This action returns all provider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} provider`;
  }

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: number) {
    return `This action removes a #${id} provider`;
  }
}
