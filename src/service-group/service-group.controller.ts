import { Controller, Get, Param } from '@nestjs/common';
import { ServiceGroupService } from './service-group.service';

@Controller('service-group')
export class ServiceGroupController {
  constructor(private readonly serviceGroupService: ServiceGroupService) {}

  @Get()
  findAll() {
    return this.serviceGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceGroupService.findOne(id);
  }
}
