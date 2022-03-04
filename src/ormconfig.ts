import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
