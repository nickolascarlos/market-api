import { Connection } from 'typeorm';
import { Provider } from './entities/provider.entity';

export default {
  provide: 'PROVIDER_REPOSITORY',
  inject: ['DATABASE_CONNECTION'],
  useFactory: (connection: Connection) => connection.getRepository(Provider),
};
