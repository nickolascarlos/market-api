import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProviderModule } from './provider/provider.module';
import { ServiceCategoryModule } from './service-category/service-category.module';
import { ServiceGroupModule } from './service-group/service-group.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [UserModule, ProviderModule, AuthModule, ConfigModule.forRoot(), ServiceCategoryModule, ServiceGroupModule, ServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
