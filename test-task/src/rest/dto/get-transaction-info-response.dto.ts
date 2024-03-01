import { IsArray, ValidateNested } from 'class-validator';
import { TransactionDto } from './transaction.dto';
import { Type } from 'class-transformer';

export class GetTransactionInfoResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionDto)
  transactions: TransactionDto[];
}
