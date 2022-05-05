import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateServiceGroupDto } from 'src/service-group/dto/create-service-group.dto';
import { UpdateServiceGroupDto } from 'src/service-group/dto/update-service-group.dto';
import { ServiceGroupService } from 'src/service-group/service-group.service';
import { customValidationPipe } from 'src/utilities';

@Controller('service-groups')
export class ServiceGroupController {
  constructor(private serviceGroupService: ServiceGroupService) {}

  @Post()
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  create(@Body() payload: CreateServiceGroupDto) {
    return this.serviceGroupService.create(payload);
  }

  @Patch(':groupName')
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  update(
    @Body() payload: UpdateServiceGroupDto,
    @Param('groupName') groupName,
  ) {
    return this.serviceGroupService.update(groupName, payload);
  }

  @Delete(':groupName')
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  remove(@Param('groupName') groupName) {
    return this.serviceGroupService.remove(groupName);
  }
}
