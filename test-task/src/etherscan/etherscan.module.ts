import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtherscanRepo } from './etherscan.repo';
import { EtherscanController } from './etherscan.controller';
import { EtherscanService } from './etherscan.service';
import { ENTITIES } from '../types';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
  providers: [EtherscanRepo, EtherscanService],
  controllers: [EtherscanController],
  exports: [EtherscanRepo],
})
export class EtherscanModule {}
