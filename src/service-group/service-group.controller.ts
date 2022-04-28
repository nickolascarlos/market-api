import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ServiceGroupService } from './service-group.service';
import { CreateServiceGroupDto } from './dto/create-service-group.dto';
import { UpdateServiceGroupDto } from './dto/update-service-group.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('service-group')
export class ServiceGroupController {
  constructor(private readonly serviceGroupService: ServiceGroupService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  create(@Body() createServiceGroupDto: CreateServiceGroupDto) {
    return this.serviceGroupService.create(createServiceGroupDto);
  }

  @Get()
  findAll() {
    return this.serviceGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceGroupService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateServiceGroupDto: UpdateServiceGroupDto,
  ) {
    return this.serviceGroupService.update(+id, updateServiceGroupDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.serviceGroupService.remove(+id);
  }
}
