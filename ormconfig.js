require('dotenv');

module.exports = {
  ssl: {
    rejectUnauthorized: false,
  },
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['./src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.ts'],
  cli: {
    migrationsDir: './migrations',
    entitiesDir: './src/**/*.entity{.ts,.js}',
  },
};
