import { Controller, Get, Param } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';

@Controller('service-categories')
export class ServiceCategoryController {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  @Get()
  findAll() {
    return this.serviceCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceCategoryService.findOne(id);
  }
}
