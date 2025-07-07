import { InvalidArgumentError } from '../errors';
import { Host, Port } from '../value-objects';
import { Mysql } from './mysql';
import { Postgres } from './postgres';
import { Sqlsrv } from './sqlsrv';
import { DatabaseOptions } from './types';

export class Database {
  private readonly _driver: string;
  private readonly _host: Host;
  private readonly _port: Port;
  private readonly _name: string;
  private readonly _user: string;
  private readonly _password: string;
  private readonly _motor: Mysql | Postgres | Sqlsrv;

  constructor({ driver, host, port, name, user, password }: DatabaseOptions) {
    this._driver = driver;
    this._host = new Host({ value: host });
    this._port = new Port({ value: port });
    this._name = name;
    this._user = user;
    this._password = password;
    this._motor = this.createMotor();
  }

  private createMotor(): Mysql | Postgres | Sqlsrv {
    const config = {
      host: this._host.value,
      port: this._port.value,
      name: this._name,
      user: this._user,
      password: this._password,
    };

    switch (this._driver) {
      case 'mysql':
        return new Mysql(config);
      case 'postgres':
        return new Postgres(config);
      case 'sqlsrv':
        return new Sqlsrv(config);
      default:
        throw new InvalidArgumentError({ message: 'Unsupported driver' });
    }
  }

  public async connect(): Promise<void> {
    await this._motor.connect();
  }

  public async query<T = any>({ content, params = [] }: { content: string; params?: any[] }): Promise<T[]> {
    return this._motor.query<T>({ content, params });
  }

  public close(): Promise<void> {
    return this._motor.close();
  }
}
