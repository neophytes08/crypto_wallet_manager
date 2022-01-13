import { config } from './ormconfig';

export = {
  ...config,
  migrationsTableName: '_migration',
  migrations: [__dirname + '/_migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/_migrations',
  },
};
