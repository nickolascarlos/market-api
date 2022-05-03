import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceGroupDto } from './dto/create-service-group.dto';
import { UpdateServiceGroupDto } from './dto/update-service-group.dto';
import { ServiceGroup } from './entities/service-group.entity';

@Injectable()
export class ServiceGroupService {
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
    await serviceGroup.save();
    return await this.findOne(id);
  }

  async remove(id: string) {
    const serviceGroup: ServiceGroup = await this.findOne(id);
    return await serviceGroup.remove();
  }
}
