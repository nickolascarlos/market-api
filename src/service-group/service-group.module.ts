import { Module } from '@nestjs/common';
import { ServiceGroupService } from './service-group.service';
import { ServiceGroupController } from './service-group.controller';
import { ServiceGroup } from './entities/service-group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceGroup])],
  controllers: [ServiceGroupController],
  providers: [ServiceGroupService],
  exports: [ServiceGroupService],
})
export class ServiceGroupModule {}
