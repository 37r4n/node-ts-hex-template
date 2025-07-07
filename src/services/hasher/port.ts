export interface Hasher {
  hash({ raw }: { raw: string }): Promise<string>;
  compare({ raw, hash }: { raw: string; hash: string }): Promise<boolean>;
}
