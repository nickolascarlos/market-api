import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { Provider } from 'src/provider/entities/provider.entity';
import { ServiceCategory } from 'src/service-category/entities/service-category.entity';
import { ServiceGroup } from 'src/service-group/entities/service-group.entity';
import { Service } from 'src/service/entities/service.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(ServiceGroup)
    private readonly serviceGroupRepository: Repository<ServiceGroup>,
    @InjectRepository(ServiceCategory)
    private readonly serviceCategoryRepository: Repository<ServiceCategory>,
  ) {}

  // TODO: Refatorar
  async get() {
    const users = {},
      providers = {},
      services = {},
      serviceGroups = {},
      serviceCategories = {};

    users['count'] = await this.userRepository.count();
    providers['count'] = await this.providerRepository.count();
    services['count'] = await this.serviceRepository.count();
    serviceGroups['count'] = await this.serviceGroupRepository.count();
    serviceCategories['count'] = await this.serviceCategoryRepository.count();

    users['providersPerUser'] = providers['count'] / users['count'];
    users['servicesPerUser'] = services['count'] / users['count'];
    providers['servicesPerProvider'] = services['count'] / providers['count'];

    const serviceCategoriesIds = await this.serviceCategoryRepository.find({
      select: ['apiName'],
    });
    serviceCategories['servicesPerEachCategory'] = _.fromPairs(
      await Promise.all(
        serviceCategoriesIds.map(async ({ apiName: id }) => [
          id,
          await this.serviceRepository.count({
            where: {
              categoryName: id,
            },
          }),
        ]),
      ),
    );

    return {
      users,
      providers,
      services,
      serviceGroups,
      serviceCategories,
    };
  }
}
