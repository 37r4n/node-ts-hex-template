import { Client } from 'pg';
import { Host, Port } from '../value-objects';
import { InternalServerError } from '../errors';
import { MotorOptions, QueryOptions } from './types';

export class Postgres {
  private readonly _host: Host;
  private readonly _port: Port;
  private readonly _name: string;
  private readonly _user: string;
  private readonly _password: string;
  private _connection: Client | null = null;

  constructor({ host, port, name, user, password }: MotorOptions) {
    this._host = new Host({ value: host });
    this._port = new Port({ value: port });
    this._name = name;
    this._user = user;
    this._password = password;
  }

  public async connect(): Promise<void> {
    if (this._connection) return;

    this._connection = new Client({
      host: this._host.value,
      port: this._port.value,
      database: this._name,
      user: this._user,
      password: this._password,
    });

    await this._connection.connect();
  }

  public async query<T = any>({ content, params = [] }: QueryOptions): Promise<T[]> {
    if (!this._connection) throw new InternalServerError({ message: 'Database has not connected' });
    const result = await this._connection.query(content, params);
    return result.rows as T[];
  }

  public async close(): Promise<void> {
    if (this._connection) {
      await this._connection.end();
      this._connection = null;
    }
  }
}
