import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ServiceCategoryController } from './service-category.controller';
import { ServiceGroupController } from './service-group.controller';
import { ProviderController } from './provider.controller';
import { ServiceController } from './service.controller';
import { ServiceCategoryModule } from 'src/service-category/service-category.module';
import { ProviderModule } from 'src/provider/provider.module';
import { ServiceGroupModule } from 'src/service-group/service-group.module';
import { ServiceModule } from 'src/service/service.module';
import { UserModule } from 'src/user/user.module';
import { StatisticsModule } from 'src/statistics/statistics.module';
import { StatisticsController } from './statistics.controller';
import { AuthController } from './auth.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    UserModule,
    ServiceCategoryModule,
    ServiceGroupModule,
    ProviderModule,
    ServiceModule,
    StatisticsModule,
    AuthModule,
  ],
  controllers: [
    UserController,
    ServiceCategoryController,
    ServiceGroupController,
    ProviderController,
    ServiceController,
    StatisticsController,
    AuthController,
  ],
})
export class AdminModule {}
