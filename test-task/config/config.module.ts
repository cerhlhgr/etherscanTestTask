import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS, ConfigModuleOptions } from './config.types';
import { ConfigValidate } from './validation/config.validate';

@Global()
@Module({
  providers: [],
  exports: [],
})
export class ConfigModule {
  static forRoot(options: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
        ConfigValidate,
        Logger,
      ],
      exports: [ConfigService, ConfigValidate, Logger],
    };
  }
}
