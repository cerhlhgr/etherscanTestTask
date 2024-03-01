import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class DBConfig {
  @Expose()
  @IsNotEmpty()
  POSTGRES_USER: string;

  @Expose()
  @IsNotEmpty()
  POSTGRES_PASSWORD: string;

  @Expose()
  @IsNotEmpty()
  POSTGRES_DB: string;

  @Expose()
  @IsNotEmpty()
  POSTGRES_HOST: string;

  @Expose()
  @IsNotEmpty()
  POSTGRES_PORT: number;
}
