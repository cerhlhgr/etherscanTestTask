import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundBusinessException extends HttpException {
  constructor(message?: string) {
    super({ message } ?? { message: 'Не найден' }, HttpStatus.NOT_FOUND);
  }
}
