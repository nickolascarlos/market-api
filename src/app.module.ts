import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProviderModule } from './provider/provider.module';
import { ServiceCategoryModule } from './service-category/service-category.module';
import { ServiceGroupModule } from './service-group/service-group.module';
import { ServiceModule } from './service/service.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@nestjs/core';
import { MailModule } from './mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    UserModule,
    ProviderModule,
    AuthModule,
    ServiceCategoryModule,
    ServiceGroupModule,
    ServiceModule,
    AdminModule,
    MailModule,
    StatisticsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST'),
        port: 5432,
        username: config.get('DATABASE_USERNAME'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
