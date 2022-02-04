import { forwardRef, Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import DatabaseModule from 'src/database/database.module';
import providerProvider from './provider.provider';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  controllers: [ProviderController],
  providers: [ProviderService, providerProvider],
  exports: [ProviderService, providerProvider],
})
export class ProviderModule {}
