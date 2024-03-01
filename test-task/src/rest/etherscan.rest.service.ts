import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetBlockInfoParam, GetTransactionInfoParam } from './types';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '../../config/config.service';
import { GetTransactionInfoResponseDto } from './dto/get-transaction-info-response.dto';

@Injectable()
export class EtherscanRestService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  public async getTransactionInfo(
    query: GetTransactionInfoParam,
  ): Promise<GetTransactionInfoResponseDto> {
    const url = this.configService.get<string>('ETHERSCAN_API_URL');
    const apiKey = this.configService.get<string>('ETHERSCAN_API_KEY');

    const req = this.httpService.get(url, {
      params: { ...query, apiKey },
    });

    this.logger.log(
      `Request GET to ${url}, body: ${JSON.stringify({ ...query })}`,
    );

    return (await firstValueFrom(req))?.data?.result;
  }

  public async getBlockInfo(query: GetBlockInfoParam): Promise<string> {
    const url = this.configService.get<string>('ETHERSCAN_API_URL');
    const apiKey = this.configService.get<string>('ETHERSCAN_API_KEY');
    const req = this.httpService.get(url, {
      params: { ...query, apiKey },
    });

    this.logger.log(
      `Request GET to ${url}, body: ${JSON.stringify({ ...query })}`,
    );

    return (await firstValueFrom(req))?.data?.result;
  }
}
