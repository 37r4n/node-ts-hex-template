import { Application } from 'express';
import { ServerOptions } from './types';

export class Server {
  private readonly _app: Application;
  private readonly _host: string;
  private readonly _port: number;

  constructor({ app, host, port }: ServerOptions) {
    this._app = app;
    this._host = host;
    this._port = port;
  }

  public async start(): Promise<this> {
    await new Promise<void>((resolve, reject) => {
      this._app
        .listen(this._port, () => {
          console.log(`Server is running on http://${this._host}:${this._port}`);
          resolve();
        })
        .on('error', reject);
    });

    return this;
  }

  public get app(): Application {
    return this._app;
  }

  public get host(): string {
    return this._host;
  }

  public get port(): number {
    return this._port;
  }
}
