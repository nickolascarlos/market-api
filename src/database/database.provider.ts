import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default {
  provide: 'DATABASE_CONNECTION',
  useFactory: () =>
    createConnection({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
    }),
};
