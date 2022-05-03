import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from 'src/user/user.service';

import { ServiceCategoryController } from './service-category.controller';
import { ServiceCategoryService } from 'src/service-category/service-category.service';

import { ServiceGroupController } from './service-group.controller';
import { ServiceGroupService } from 'src/service-group/service-group.service';
import { ProviderController } from './provider.controller';
import { ProviderService } from 'src/provider/provider.service';

@Module({
  controllers: [
    UserController,
    ServiceCategoryController,
    ServiceGroupController,
    ProviderController,
  ],
  providers: [
    UserService,
    ServiceCategoryService,
    ServiceGroupService,
    ProviderService,
  ],
})
export class AdminModule {}
