import { InvalidArgumentError } from '../errors';

export class Uuid {
  private readonly _value: string;

  constructor({ value }: { value: string }) {
    this.ensureValueIsDefined({ value });
    this.ensureValueIsValid({ value });
    this._value = value;
  }

  private ensureValueIsDefined({ value }: { value: string }) {
    if (value === null || value === undefined || value.trim() === '') {
      throw new InvalidArgumentError({ message: 'UUID must be defined' });
    }
  }

  private ensureValueIsValid({ value }: { value: string }) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!regex.test(value)) {
      throw new InvalidArgumentError({ message: 'Invalid UUID format' });
    }
  }

  public get value(): string {
    return this._value;
  }
}
