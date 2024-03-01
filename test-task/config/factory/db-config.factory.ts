import { ConfigService } from '../config.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENTITIES } from '../../src/types';

export const dbConfigFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  entities: ENTITIES,
  synchronize: true,
});
