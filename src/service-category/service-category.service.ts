import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ServiceCategory } from './entities/service-category.entity';

@Injectable()
export class ServiceCategoryService {
  create(createServiceCategoryDto: CreateServiceCategoryDto) {
    return 'ADMIN ACTION - This action adds a new serviceCategory';
  }

  async findAll() {
    const categories: ServiceCategory[] = await ServiceCategory.find({
      relations: ['group'],
    });

    return categories;
  }

  async findOne(id: string) {
    const category: ServiceCategory = await ServiceCategory.findOneOrFail(id, {
      relations: ['group'],
    }).catch((e) => {
      throw new NotFoundException('No service category with such id');
    });

    return category;
  }

  update(id: number, updateServiceCategoryDto: UpdateServiceCategoryDto) {
    return `ADMIN ACTION - This action updates a #${id} serviceCategory`;
  }

  remove(id: number) {
    return `ADMIN ACTION - This action removes a #${id} serviceCategory`;
  }
}
