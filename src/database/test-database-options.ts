import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const testDatabaseOptions: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  dropSchema: true,
  entities: ['src/**/*.entity.ts'],
};
