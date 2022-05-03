import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateServiceDto } from 'src/service/dto/create-service.dto';
import { UpdateServiceDto } from 'src/service/dto/update-service.dto';
import { ServiceService } from 'src/service/service.service';
import { customValidationPipe } from 'src/utilities';

@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Post()
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  create(@Body() payload: CreateServiceDto) {
    return this.serviceService.create(payload, null, true);
  }

  @Patch(':service_id')
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  update(
    @Body() payload: UpdateServiceDto,
    @Param('service_id', ParseUUIDPipe) serviceId,
  ) {
    return this.serviceService.update(serviceId, payload, null, true);
  }

  @Delete(':service_id')
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  delete(@Param('service_id') serviceId) {
    return this.serviceService.remove(serviceId, null, true);
  }
}
