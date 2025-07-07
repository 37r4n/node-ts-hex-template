import { Application } from 'express';
import { ServerOptions } from './types';
import { Host, Port } from '../value-objects';

export class Server {
  private readonly _app: Application;
  private readonly _host: Host;
  private readonly _port: Port;

  constructor({ app, host, port }: ServerOptions) {
    this._app = app;
    this._host = new Host({ value: host });
    this._port = new Port({ value: port });
  }

  public async start(): Promise<this> {
    await new Promise<void>((resolve, reject) => {
      this._app
        .listen(this._port.value, () => {
          console.log(`Server is running on http://${this._host.value}:${this._port.value}`);
          resolve();
        })
        .on('error', reject);
    });

    return this;
  }
}
