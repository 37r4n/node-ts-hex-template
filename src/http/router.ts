import { Router as ExpressRouter } from 'express';
import { RouteOptions } from './types';

export class Router {
  private readonly _router = ExpressRouter();

  public get({ path, handler, middlewares = [] }: RouteOptions): this {
    this._router.get(path, ...middlewares, handler);
    return this;
  }

  public post({ path, handler, middlewares = [] }: RouteOptions): this {
    this._router.post(path, ...middlewares, handler);
    return this;
  }

  public put({ path, handler, middlewares = [] }: RouteOptions): this {
    this._router.put(path, ...middlewares, handler);
    return this;
  }

  public patch({ path, handler, middlewares = [] }: RouteOptions): this {
    this._router.patch(path, ...middlewares, handler);
    return this;
  }

  public delete({ path, handler, middlewares = [] }: RouteOptions): this {
    this._router.delete(path, ...middlewares, handler);
    return this;
  }

  public build(): ExpressRouter {
    return this._router;
  }
}
