import { Module } from '@nestjs/common';
import { CronJobService } from './cron-job.service';
import { ScheduleModule } from '@nestjs/schedule';
import { RestModule } from '../rest/rest.module';
import { EtherscanModule } from '../etherscan/etherscan.module';

@Module({
  imports: [ScheduleModule.forRoot(), RestModule, EtherscanModule],
  providers: [CronJobService],
})
export class CronJobModule {}
