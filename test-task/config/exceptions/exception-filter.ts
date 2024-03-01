import { Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { ValidationError } from 'class-validator';
import { AxiosError } from 'axios';
import { InternalBusinessException } from './exception-types/internal-business.exception';
import {NotFoundBusinessException} from "./exception-types/not-found-business.exception";

@Catch()
export class ExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    if (exception instanceof InternalBusinessException) {
      this.logger.error(exception.getResponse());
      const response = exception.getResponse();
      const statusCode = exception.getStatus();
      httpAdapter.reply(ctx.getResponse(), response, statusCode);
      return;
    }

    if (exception instanceof NotFoundBusinessException) {
      this.logger.error(exception.getResponse());
      const response = exception.getResponse();
      const statusCode = exception.getStatus();
      httpAdapter.reply(ctx.getResponse(), response, statusCode);
      return;
    }

    if (exception?.[0] instanceof ValidationError) {
      this.logger.error(JSON.stringify(exception));
      const message = [];
      for (const item of exception as ValidationError[]) {
        message.push({ property: item.property, messages: item.constraints });
      }

      httpAdapter.reply(ctx.getResponse(), message, HttpStatus.BAD_REQUEST);
      return;
    }

    if (exception instanceof AxiosError) {
      this.logger.error(exception['data']);
      const response = exception.response.data;
      const statusCode = exception.response.status;
      httpAdapter.reply(ctx.getResponse(), response, statusCode);
      return;
    }
    this.logger.error(exception);
    httpAdapter.reply(
      ctx.getResponse(),
      {
        message: 'Внутренняя ошибка сервера',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
