import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class AppConfig {
  @Expose()
  @IsNotEmpty()
  PORT: string;
}
