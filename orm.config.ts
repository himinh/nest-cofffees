import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const configOrm: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: 'minhchiu',
  autoLoadEntities: true,
  synchronize: true,
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
}
