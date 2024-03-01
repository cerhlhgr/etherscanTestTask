import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class RestConfig {
  @Expose()
  @IsNotEmpty()
  ETHERSCAN_API_URL: string;

  @Expose()
  @IsNotEmpty()
  ETHERSCAN_API_KEY: string;
}
