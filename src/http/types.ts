import { Application, RequestHandler, Router } from 'express';

export interface MiddlewareOptions {
  handler: RequestHandler;
}

export interface RouteOptions {
  path: string;
  handler: RequestHandler;
  middlewares?: RequestHandler[];
}

export interface RouterOptions {
  path?: string;
  handler: Router;
  middlewares?: RequestHandler[];
}

export interface ServerOptions {
  app: Application;
  host: string;
  port: number;
}
