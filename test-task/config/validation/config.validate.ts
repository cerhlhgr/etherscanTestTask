import { validateSync } from 'class-validator';
import { Injectable, Logger } from '@nestjs/common';
import { validationExceptionFactory } from '../factory/validation-exception.factory';

@Injectable()
export class ConfigValidate {
  constructor(private readonly logger: Logger) {}

  validateConfig(config: object): void {
    const errors = validateSync(config, { whitelist: true });

    if (errors.length > 0) {
      validationExceptionFactory(errors, this.logger);
      process.exit(0);
    }
  }
}
