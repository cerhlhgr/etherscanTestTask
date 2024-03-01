import { GetTransactionInfoDto } from '../cron-job/dto/getTransactionInfo.dto';

export type GetTransactionInfoParam = GetTransactionInfoDto;
export type GetBlockInfoParam = Partial<GetTransactionInfoDto>;
