import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import userProvider from './user.provider';
import DatabaseModule from '../database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProviderModule } from 'src/provider/provider.module';

@Module({
  imports: [DatabaseModule, AuthModule, ProviderModule],
  controllers: [UserController],
  providers: [UserService, userProvider],
  exports: [UserService],
})
export class UserModule {}
