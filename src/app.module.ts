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
import { FileModule } from './file/file.module';
import { ContactModule } from './contact/contact.module';
import { SentryModule } from '@ntegral/nestjs-sentry';

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
    FileModule,
    ContactModule,
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
        ssl: {
          rejectUnauthorized: false,
        },
        url:
          config.get('PRODUCTION') === 'TRUE'
            ? config.get('DATABASE_URL')
            : config.get('DEV_DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get('PRODUCTION') === 'FALSE',
      }),
      inject: [ConfigService],
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        dsn: config.get('SENTRY_DSN'),
        environment: config.get('PRODUCTION') === 'TRUE' ? 'production' : 'dev',
        logLevel: config.get('SENTRY_LOG_LEVEL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
