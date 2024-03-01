import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EtherscanTransactionsEntity } from './entities/etherscan-transactions.entity';
import { NotFoundBusinessException } from '../../config/exceptions/exception-types/not-found-business.exception';

@Injectable()
export class EtherscanRepo {
  constructor(
    @InjectRepository(EtherscanTransactionsEntity)
    private readonly etherscanRepo: Repository<EtherscanTransactionsEntity>,
  ) {}

  public async saveTransactions(
    transactions: EtherscanTransactionsEntity[],
  ): Promise<void> {
    await this.etherscanRepo.upsert(transactions, { conflictPaths: ['hash'] });
  }

  public async getLastChangedWalletAddress(): Promise<{ address: string }> {
    const res = await this.etherscanRepo.query(`
    WITH block_numbers AS (
      SELECT
        etherscan_transactions.block_number
      FROM
        etherscan_transactions
      GROUP BY
        block_number
      ORDER BY
        block_number DESC         
      LIMIT 100
             )
    SELECT
      t1.address
    FROM
      (
        SELECT
          "to" as address,
          count(value) as to_count
        FROM
          etherscan_transactions
            JOIN block_numbers ON etherscan_transactions.block_number = block_numbers.block_number
        GROUP BY
          "to"
      ) as t1
        JOIN (
        SELECT
          "from" as address,
          count(value) as to_count
        FROM
          etherscan_transactions
            JOIN block_numbers ON etherscan_transactions.block_number = block_numbers.block_number
        GROUP BY
          "from"
      ) as t2 ON t1.address = t2.address
    GROUP BY
      t1.address
    ORDER BY
      MAX(t2.to_count + t1.to_count) DESC 
    LIMIT 1
    `);

    if (!res?.length) {
      throw new NotFoundBusinessException('Данных по блокам не найдено');
    }
    return res[0];
  }
}
