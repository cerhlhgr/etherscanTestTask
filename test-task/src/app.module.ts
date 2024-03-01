import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { AppConfig } from '../config/config/app.config';
import { RestConfig } from '../config/config/rest.config';
import { CronJobModule } from './cron-job/cron-job.module';
import { DBConfig } from '../config/config/db.config';
import { ConfigService } from '../config/config.service';
import { dbConfigFactory } from '../config/factory/db-config.factory';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      path: './',
      entities: [AppConfig, RestConfig, DBConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        dbConfigFactory(configService),
      inject: [ConfigService],
    }),
    CronJobModule,
  ],
  providers: [],
})
export class AppModule {}
