import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS, ConfigEnv, ConfigModuleOptions } from './config.types';
import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'dotenv';
import { plainToClass } from 'class-transformer';
import { ConfigValidate } from './validation/config.validate';
@Injectable()
export class ConfigService {
  private readonly envConfig: ConfigEnv;

  constructor(
    @Inject(CONFIG_OPTIONS) private options: ConfigModuleOptions,
    private readonly configValidate: ConfigValidate,
  ) {
    const filePath = `.env`;

    const envFile = path.resolve('./', this.options.path, filePath);

    const envData = parse(fs.readFileSync(envFile));

    let data = {};

    for (const entity of this.options.entities) {
      const instance: typeof entity = plainToClass(entity, envData, {
        excludeExtraneousValues: true,
      });
      this.configValidate.validateConfig(instance);

      data = { ...data, ...instance };
    }

    this.envConfig = data;
  }

  get<T>(key: string): T {
    return this.envConfig[key];
  }
}
