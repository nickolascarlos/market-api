import { Module } from '@nestjs/common';
import databaseProvider from './database.provider';

@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export default class Database {}
