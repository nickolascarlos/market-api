import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceGroupDto } from './dto/create-service-group.dto';
import { UpdateServiceGroupDto } from './dto/update-service-group.dto';
import { ServiceGroup } from './entities/service-group.entity';

@Injectable()
export class ServiceGroupService {
  constructor(
    @InjectRepository(ServiceGroup)
    private readonly serviceGroupRepository: Repository<ServiceGroup>,
  ) {}

  async create(payload: CreateServiceGroupDto) {
    const newServiceGroup: ServiceGroup = new ServiceGroup();
    Object.assign(newServiceGroup, payload);
    await ServiceGroup.insert(newServiceGroup);
    return await this.findOne(newServiceGroup.apiName);
  }

  async findAll() {
    const groups: ServiceGroup[] = await ServiceGroup.find({
      relations: ['categories'],
    });

    return groups;
  }

  async findOne(id: string) {
    const group: ServiceGroup = await ServiceGroup.findOneOrFail(id, {
      relations: ['categories'],
    }).catch((e) => {
      throw new NotFoundException('No service group with such id');
    });

    return group;
  }

  async update(id: string, payload: UpdateServiceGroupDto) {
    const serviceGroup: ServiceGroup = await this.findOne(id);
    Object.assign(serviceGroup, payload);
    await ServiceGroup.update(id, payload);
    delete serviceGroup.categories;
    return serviceGroup;
  }

  async remove(id: string) {
    const serviceGroup: ServiceGroup = await this.findOne(id);
    await serviceGroup.remove();
    return 'removed';
  }
}
