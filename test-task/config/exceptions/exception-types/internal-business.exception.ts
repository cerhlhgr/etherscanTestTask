import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalBusinessException extends HttpException {
  constructor(message?: string) {
    super(
      { message } ?? { message: 'Внутренняя ошибка сервера' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
