import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProviderModule } from './provider/provider.module';
import { ServiceCategoryModule } from './service-category/service-category.module';
import { ServiceGroupModule } from './service-group/service-group.module';
import { ServiceModule } from './service/service.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@nestjs/core';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    UserModule,
    ProviderModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServiceCategoryModule,
    ServiceGroupModule,
    ServiceModule,
    AdminModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
    ]),
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
