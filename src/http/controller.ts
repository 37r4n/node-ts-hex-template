import { Handler } from 'express';

export class Controller {
  private readonly _handlers: Record<string, Handler> = {};

  public add({ name, handler }: { name: string; handler: Handler }): this {
    this._handlers[name] = handler;
    return this;
  }

  public build(): Record<string, Handler> {
    return { ...this._handlers };
  }
}
