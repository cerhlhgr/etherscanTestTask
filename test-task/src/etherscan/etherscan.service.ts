import { Injectable } from '@nestjs/common';
import { EtherscanRepo } from './etherscan.repo';

@Injectable()
export class EtherscanService {
  constructor(private readonly etherscanRepo: EtherscanRepo) {}

  public async getLastChangedWalletAddress(): Promise<{ address: string }> {
    return this.etherscanRepo.getLastChangedWalletAddress();
  }
}
