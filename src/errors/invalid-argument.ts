import { BaseError } from './base';

export class InvalidArgumentError extends BaseError {
  constructor({ message = 'Invalid argument' }: { message?: string }) {
    super({ message, code: 400, type: 'INVALID_ARGUMENT_ERROR' });
  }
}
