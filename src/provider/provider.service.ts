import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { off } from 'process';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    private readonly userService: UserService,
  ) {}

  async create(payload: CreateProviderDto, userId: string) {
    const newProvider = new Provider();
    console.log(userId);
    Object.assign(newProvider, {
      ...payload,
      userId,
    });
    await newProvider.save();
    delete newProvider.user;
    return newProvider;
  }

  findAll(offset: number, limit: number) {
    return Provider.find({
      skip: offset,
      take: limit,
    });
  }

  findOne(id: string) {
    return Provider.findOneOrFail(id, {
      relations: ['services', 'services.category'],
    }).catch(() => {
      throw new NotFoundException('No provider with such id');
    });
  }

  async update(
    id: string,
    payload: UpdateProviderDto,
    loggedInUserId: string,
    adminAction = false,
  ) {
    const provider = await this.findOne(id);

    if (!adminAction) {
      // Make sure Provider belongs to logged-in user
      if (provider.userId !== loggedInUserId)
        throw new UnauthorizedException(
          'Provider does not belong to logged-in user',
        );
    }

    Object.assign(provider, payload);
    return await provider.save();
  }

  async remove(id: string, loggedInUserId: string, adminAction = false) {
    const provider = !adminAction
      ? await this.findOneFromUser(id, loggedInUserId)
      : await this.findOne(id);

    await provider.remove();
    return 'removed';
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
