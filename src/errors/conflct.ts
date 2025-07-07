import { BaseError } from './base';

export class ConflictError extends BaseError {
  constructor({ message = 'Conflict' }: { message?: string }) {
    super({ message, code: 409, type: 'CONFLICT_ERROR' });
  }
}
