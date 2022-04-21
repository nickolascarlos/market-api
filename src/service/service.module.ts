import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ProviderService } from 'src/provider/provider.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, UserService, ProviderService]
})
export class ServiceModule {}
