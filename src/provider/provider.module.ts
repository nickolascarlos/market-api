import { forwardRef, Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';

@Module({
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Provider])],
  controllers: [ProviderController],
  providers: [ProviderService],
  exports: [ProviderService],
})
export class ProviderModule {}
