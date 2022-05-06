import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ServiceCategory } from './entities/service-category.entity';

@Injectable()
export class ServiceCategoryService {
  constructor(
    @InjectRepository(ServiceCategory)
    private readonly serviceCategoryRepository: Repository<ServiceCategory>,
  ) {}

  async create(payload: CreateServiceCategoryDto) {
    const newServiceCategory: ServiceCategory = new ServiceCategory();
    Object.assign(newServiceCategory, payload);
    await ServiceCategory.insert(newServiceCategory);
    return await ServiceCategory.findOne(newServiceCategory.apiName);
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

  async update(id: string, payload: UpdateServiceCategoryDto) {
    const serviceCategory: ServiceCategory = await this.findOne(id);
    Object.assign(serviceCategory, payload);
    await ServiceCategory.update(id, payload);
    delete serviceCategory.group;
    return serviceCategory;
  }

  async remove(id: string) {
    const serviceCategory: ServiceCategory = await this.findOne(id);
    await serviceCategory.remove();
    return 'removed';
  }
}
