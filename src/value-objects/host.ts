import { InvalidArgumentError } from '../errors';

export class Host {
  private readonly _value: string;

  constructor({ value }: { value: string }) {
    this.ensureValueIsDefined({ value });
    this.ensureValueIsValid({ value });
    this._value = value;
  }

  private ensureValueIsDefined({ value }: { value: string }) {
    if (value === null || value === undefined || value.trim() === '') {
      throw new InvalidArgumentError({ message: 'Host must be defined' });
    }
  }

  private ensureValueIsValid({ value }: { value: string }) {
    const regex = /^(([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+|localhost|(\d{1,3}\.){3}\d{1,3})$/;

    if (!regex.test(value)) {
      throw new InvalidArgumentError({ message: 'Invalid host format' });
    }
  }

  public get value(): string {
    return this._value;
  }
}
