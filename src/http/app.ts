import express, { Application } from 'express';
import { MiddlewareOptions, RouterOptions } from './types';

export class App {
  private readonly _app = express();

  public middleware({ handler }: MiddlewareOptions): this {
    this._app.use(handler);
    return this;
  }

  public router({ path = '/', handler, middlewares = [] }: RouterOptions): this {
    this._app.use(path, middlewares, handler);
    return this;
  }

  public build(): Application {
    return this._app;
  }
}
