import { InvalidArgumentError } from '../errors';

export class Name {
  private readonly _value: string;

  constructor({ value }: { value: string }) {
    this.ensureValueIsDefined({ value });
    this.ensureValueIsValid({ value });
    this._value = value;
  }

  private ensureValueIsDefined({ value }: { value: string }) {
    if (value === null || value === undefined || value.trim() === '') {
      throw new InvalidArgumentError({ message: 'Name must be defined' });
    }
  }

  private ensureValueIsValid({ value }: { value: string }) {
    const trimmed = value.trim();

    if (trimmed.length < 2 || trimmed.length > 50) {
      throw new InvalidArgumentError({
        message: 'Name must be between 2 and 50 characters',
      });
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
      throw new InvalidArgumentError({
        message: 'Name can only contain letters and spaces',
      });
    }
  }

  public get value(): string {
    return this._value;
  }
}
