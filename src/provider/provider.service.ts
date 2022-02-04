import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProviderService {
  constructor(
    private readonly userService: UserService,
    @Inject('PROVIDER_REPOSITORY')
    private readonly providerRepository: Repository<Provider>,
  ) {}

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

  findOne(id: string) {
    return this.providerRepository.findOneOrFail(id).catch(() => {
      throw new NotFoundException('No provider with such id');
    });
  }

  async update(id: string, payload: UpdateProviderDto, loggedInUserId: string) {
    const provider = await this.findOne(id);

    // Make sure Provider belongs to logged-in user
    if (provider.user_id !== loggedInUserId)
      throw new UnauthorizedException(
        'Provider does not belong to logged-in user',
      );

    Object.assign(provider, payload);

    return await provider.save();
  }

  async remove(id: string, loggedInUserId: string) {
    const provider = await this.findOne(id);

    // Make sure Provider belongs to logged-in user
    if (provider.user_id !== loggedInUserId)
      throw new UnauthorizedException(
        'Provider does not belong to logged-in user',
      );

    return await provider.remove();
  }
}
