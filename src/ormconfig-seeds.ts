import { config } from './ormconfig';

export = {
  ...config,
  migrationsTableName: '_seed',
  migrations: [__dirname + '/_seeds/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/_seeds',
  },
};
