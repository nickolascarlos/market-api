import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProviderService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async create(payload: CreateProviderDto, userId: string) {
    const newProvider = new Provider();
    console.log(userId)
    Object.assign(newProvider, {
        ...payload,
        userId
      });
    await newProvider.save();
    delete newProvider.user;
    return newProvider;
  }

  findAll() {
    return `This action returns all provider`;
  }

  findOne(id: string) {
    return Provider.findOneOrFail(id).catch(() => {
      throw new NotFoundException('No provider with such id');
    });
  }

  async update(id: string, payload: UpdateProviderDto, loggedInUserId: string) {
    const provider = await this.findOne(id);

    // Make sure Provider belongs to logged-in user
    if (provider.userId !== loggedInUserId)
      throw new UnauthorizedException(
        'Provider does not belong to logged-in user',
      );

    Object.assign(provider, payload);

    return await provider.save();
  }

  async remove(id: string, loggedInUserId: string) {
    const provider = await this.findOneFromUser(id, loggedInUserId);

    return await provider.remove();
  }

  async findOneFromUser(providerId: string, loggedInUserId: string) {
    const provider: Provider = await this.findOne(providerId);

    if (provider.userId !== loggedInUserId)
      throw new UnauthorizedException(
        'Provider does not belong to logged-in user',
      );

    return await provider;
  }
}
