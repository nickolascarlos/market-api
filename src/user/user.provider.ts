import { Connection } from 'typeorm';
import { User } from './entities/user.entity';

export default {
  provide: 'USER_REPOSITORY',
  inject: ['DATABASE_CONNECTION'],
  useFactory: async (connection: Connection) =>
    await connection.getRepository(User),
};
