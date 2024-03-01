import { IsString } from 'class-validator';

export class TransactionDto {
  @IsString()
  blockHash: string;

  @IsString()
  blockNumber: string;

  @IsString()
  from: string;

  @IsString()
  gas: string;

  @IsString()
  gasPrice: string;

  @IsString()
  hash: string;

  @IsString()
  input: string;

  @IsString()
  nonce: string;

  @IsString()
  to: string;

  @IsString()
  transactionIndex: string;

  @IsString()
  value: string;

  @IsString()
  type: string;

  @IsString()
  v: string;

  @IsString()
  r: string;

  @IsString()
  s: string;
}
