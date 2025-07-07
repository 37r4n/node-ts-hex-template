export class BaseError extends Error {
  public readonly code: number;
  public readonly type: string;

  constructor({ message, code, type }: { message: string; code: number; type: string }) {
    super(message);
    this.name = new.target.name;
    this.type = type;
    this.code = code;
    Error.captureStackTrace?.(this, new.target);
  }
}
