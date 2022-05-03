import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from 'src/user/user.service';

import { ServiceCategoryController } from './service-category.controller';
import { ServiceCategoryService } from 'src/service-category/service-category.service';

import { ServiceGroupController } from './service-group.controller';
import { ServiceGroupService } from 'src/service-group/service-group.service';

@Module({
  controllers: [
    UserController,
    ServiceCategoryController,
    ServiceGroupController,
  ],
  providers: [UserService, ServiceCategoryService, ServiceGroupService],
})
export class AdminModule {}
