import { ENTITIES } from '../../src/types';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import migrations from './migrations/';

const ENV_FILE = `.env`;

if (!fs.existsSync(ENV_FILE)) {
  // eslint-disable-next-line no-console
  console.error(`Configuration error: ${ENV_FILE} not exists`);
  process.exit(1);
}

dotenv.config({ path: ENV_FILE });

function strict(name: string): string {
  const value = process.env[name];
  if (!value) {
    // eslint-disable-next-line no-console
    console.error(`missing environment variable '${name}'`);
    process.exit(1);
  }
  return value;
}

export default new DataSource({
  type: 'postgres',
  host: strict('POSTGRES_HOST'),
  port: +strict('POSTGRES_PORT'),
  username: strict('POSTGRES_USER'),
  password: strict('POSTGRES_PASSWORD'),
  database: strict('POSTGRES_DB'),
  entities: ENTITIES,
  migrations,
  migrationsTableName: 'migration',
  synchronize: true,
});
