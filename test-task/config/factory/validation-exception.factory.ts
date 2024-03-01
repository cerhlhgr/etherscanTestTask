import { ValidationError } from 'class-validator';
import { Logger } from '@nestjs/common';

export const validationExceptionFactory = (
  errors: ValidationError[],
  logger: Logger,
) => {
  if (errors.length > 0) {
    for (const error of errors) {
      const { property, constraints } = error;
      for (const constrain in constraints) {
        logger.error(
          `ENV ERROR, PROPERTY: ${property}, MESSAGE: ${constrain} : ${constraints[constrain]}`,
        );
      }
    }
  }
};
