import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceGroupDto } from './dto/create-service-group.dto';
import { UpdateServiceGroupDto } from './dto/update-service-group.dto';
import { ServiceGroup } from './entities/service-group.entity';

@Injectable()
export class ServiceGroupService {
  create(createServiceGroupDto: CreateServiceGroupDto) {
    return 'ADMIN ACTION - This action adds a new serviceGroup';
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

  update(id: number, updateServiceGroupDto: UpdateServiceGroupDto) {
    return `ADMIN ACTION - This action updates a #${id} serviceGroup`;
  }

  remove(id: number) {
    return `ADMIN ACTION - This action removes a #${id} serviceGroup`;
  }
}
