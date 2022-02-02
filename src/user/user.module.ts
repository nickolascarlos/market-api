import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import userProvider from './user.provider';
import DatabaseModule from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, userProvider],
  exports: [DatabaseModule, userProvider],
})
export class UserModule {}
