import bcrypt from 'bcrypt';
import { Hasher } from './port';

export class BcryptHasher implements Hasher {
  public async hash({ raw }: { raw: string }): Promise<string> {
    return await bcrypt.hash(raw, 10);
  }

  public async compare({ raw, hash }: { raw: string; hash: string }): Promise<boolean> {
    return await bcrypt.compare(raw, hash);
  }
}
