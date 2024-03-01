import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class GetTransactionInfoDto {
  @IsNotEmpty()
  @IsString()
  module: string;

  @IsNotEmpty()
  @IsString()
  action: string;

  @IsNotEmpty()
  @IsString()
  tag: string;

  @IsNotEmpty()
  @IsBoolean()
  boolean: boolean;
}
