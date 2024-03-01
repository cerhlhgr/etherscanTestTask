import { Controller, Get } from '@nestjs/common';
import { EtherscanService } from './etherscan.service';

@Controller('etherscan')
export class EtherscanController {
  constructor(private readonly etherscanService: EtherscanService) {}
  @Get('getMaxBalanceAddress')
  public async getMaxBalanceAddress(): Promise<{ address: string }> {
    return this.etherscanService.getLastChangedWalletAddress();
  }
}
