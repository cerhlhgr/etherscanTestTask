import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EtherscanRestService } from '../rest/etherscan.rest.service';
import { EtherscanRepo } from '../etherscan/etherscan.repo';
import {
  ActionTypes,
  CHUNK_SIZE,
  INIT_BLOCK_NUMBER,
  ModuleTypes,
} from './types';

@Injectable()
export class CronJobService {
  constructor(
    private readonly etherscanRestService: EtherscanRestService,
    private readonly etherscanService: EtherscanRepo,
    private readonly logger: Logger,
  ) {}
  @Cron(CronExpression.EVERY_MINUTE)
  async getTransactionInfo() {
    try {
      const lastBlock = await this.etherscanRestService.getBlockInfo({
        module: ModuleTypes.Proxy,
        action: ActionTypes.EthBlockNumber,
      });

      for (
        let block = INIT_BLOCK_NUMBER;
        block < +lastBlock;
        block = block + CHUNK_SIZE
      ) {
        if (CHUNK_SIZE * 60 <= block - INIT_BLOCK_NUMBER) {
          break;
        }

        const transactions = [];
        for (let sub = block; sub < block + CHUNK_SIZE; sub++) {
          const query = {
            module: ModuleTypes.Proxy,
            action: ActionTypes.EthGetBlockByNumber,
            tag: `0x` + sub.toString(16),
            boolean: true,
          };
          const req = await this.etherscanRestService.getTransactionInfo(query);
          transactions.push(...req?.transactions);
        }
        await this.etherscanService.saveTransactions(transactions);
        await new Promise((resolve) => setTimeout(resolve, 1000 / CHUNK_SIZE));
      }
    } catch (err) {
      this.logger.error(
        `Ошибка при получении и сохранении списка транзакций: \n ${err}`,
      );
    }
  }
}
