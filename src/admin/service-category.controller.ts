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
import { CreateServiceCategoryDto } from 'src/service-category/dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from 'src/service-category/dto/update-service-category.dto';
import { ServiceCategoryService } from 'src/service-category/service-category.service';
import { customValidationPipe } from 'src/utilities';

@Controller('service-categories')
export class ServiceCategoryController {
  constructor(private serviceCategoryService: ServiceCategoryService) {}

  @Post()
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  create(@Body() payload: CreateServiceCategoryDto) {
    return this.serviceCategoryService.create(payload);
  }

  @Patch(':categoryName')
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  update(
    @Body() payload: UpdateServiceCategoryDto,
    @Param('categoryName') categoryName,
  ) {
    return this.serviceCategoryService.update(categoryName, payload);
  }

  @Delete(':categoryName')
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  remove(@Param('categoryName') categoryName) {
    return this.serviceCategoryService.remove(categoryName);
  }
}
