import { InvalidArgumentError } from '../errors';

export class Port {
  private readonly _value: number;

  constructor({ value }: { value: number }) {
    this.ensureValueIsDefined({ value });
    this.ensureValueIsValid({ value });
    this._value = value;
  }

  private ensureValueIsDefined({ value }: { value: number }) {
    if (value === null || value === undefined || isNaN(value)) {
      throw new InvalidArgumentError({ message: 'Port must be defined' });
    }
  }

  private ensureValueIsValid({ value }: { value: number }) {
    if (!Number.isInteger(value) || value < 1 || value > 65535) {
      throw new InvalidArgumentError({ message: 'Port must be an integer between 1 and 65535' });
    }
  }

  public get value(): number {
    return this._value;
  }
}
