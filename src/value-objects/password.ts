import { InvalidArgumentError } from '../errors';

export class Password {
  private readonly _value: string;

  constructor({ value }: { value: string }) {
    this.ensureValueIsDefined({ value });
    this.ensureValueIsValid({ value });
    this._value = value;
  }

  private ensureValueIsDefined({ value }: { value: string }) {
    if (value === null || value === undefined || value.trim() === '') {
      throw new InvalidArgumentError({ message: 'Password must be defined' });
    }
  }

  private ensureValueIsValid({ value }: { value: string }) {
    if (value.length < 8) {
      throw new InvalidArgumentError({ message: `Password must be al teast 8 characters` });
    }

    if (!/[A-Z]/.test(value)) {
      throw new InvalidArgumentError({
        message: 'Password must include uppercase',
      });
    }

    if (!/[a-z]/.test(value)) {
      throw new InvalidArgumentError({
        message: 'Password must include lowercase',
      });
    }

    if (!/[0-9]/.test(value)) {
      throw new InvalidArgumentError({
        message: 'Password must include number',
      });
    }

    if (!/[^A-Za-z0-9]/.test(value)) {
      throw new InvalidArgumentError({
        message: 'Password must include special character',
      });
    }
  }

  public get value(): string {
    return this._value;
  }
}
