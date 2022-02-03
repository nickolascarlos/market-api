import { User } from 'src/user/entities/user.entity';
import { Connection } from 'typeorm';

export default {
  provide: 'PROVIDER_REPOSITORY',
  inject: ['DATABASE_CONNECTION'],
  useFactory: (connection: Connection) => connection.getRepository(User),
};
