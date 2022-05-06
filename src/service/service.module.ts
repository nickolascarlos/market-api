import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service } from './entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderModule } from 'src/provider/provider.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ServiceModule,
    UserModule,
    ProviderModule,
    TypeOrmModule.forFeature([Service]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
