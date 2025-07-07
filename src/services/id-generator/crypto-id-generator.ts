import { randomUUID } from 'crypto';
import { IdGenerator } from './port';

export class CryptoIdGenerator implements IdGenerator {
  public generate(): string {
    return randomUUID();
  }
}
