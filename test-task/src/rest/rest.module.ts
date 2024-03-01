import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EtherscanRestService } from './etherscan.rest.service';

@Module({
  imports: [HttpModule],
  providers: [EtherscanRestService],
  exports: [EtherscanRestService, HttpModule],
})
export class RestModule {}
