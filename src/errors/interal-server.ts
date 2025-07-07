import { BaseError } from './base';

export class InternalServerError extends BaseError {
  constructor({ message = 'Internal server' }: { message?: string }) {
    super({ message, code: 500, type: 'INTERNAL_SERVER_ERROR' });
  }
}
