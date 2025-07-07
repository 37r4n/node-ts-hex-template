import { InvalidArgumentError } from '../errors';

export class Email {
  private readonly _value: string;

  constructor({ value }: { value: string }) {
    this.ensureValueIsDefined({ value });
    this.ensureValueIsValid({ value });
    this._value = value;
  }

  private ensureValueIsDefined({ value }: { value: string }) {
    if (value === null || value === undefined || value.trim() === '') {
      throw new InvalidArgumentError({ message: 'Email must be defined' });
    }
  }

  private ensureValueIsValid({ value }: { value: string }) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(value)) {
      throw new InvalidArgumentError({ message: 'Invalid email format' });
    }
  }

  public get value(): string {
    return this._value;
  }
}
