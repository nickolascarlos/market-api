import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserController } from './user.controller';
import { ServiceCategoryController } from './service-category.controller';
import { ServiceCategoryService } from 'src/service-category/service-category.service';

@Module({
  controllers: [UserController, ServiceCategoryController],
  providers: [UserService, ServiceCategoryService],
})
export class AdminModule {}
