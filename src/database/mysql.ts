import mysql, { Connection, RowDataPacket } from 'mysql2/promise';
import { Host, Port } from '../value-objects';
import { MotorOptions, QueryOptions } from './types';
import { InternalServerError } from '../errors';

export class Mysql {
  private readonly _host: Host;
  private readonly _port: Port;
  private readonly _name: string;
  private readonly _user: string;
  private readonly _password: string;
  private _connection: Connection | null = null;

  constructor({ host, port, name, user, password }: MotorOptions) {
    this._host = new Host({ value: host });
    this._port = new Port({ value: port });
    this._name = name;
    this._user = user;
    this._password = password;
  }

  public async connect(): Promise<void> {
    if (this._connection) return;
    this._connection = await mysql.createConnection({
      host: this._host.value,
      port: this._port.value,
      database: this._name,
      user: this._user,
      password: this._password,
    });
  }

  public async query<T = any>({ content, params = [] }: QueryOptions): Promise<T[]> {
    if (!this._connection) throw new InternalServerError({ message: 'Database has not connected' });
    const [rows] = await this._connection.query<RowDataPacket[]>(content, params);
    return rows as T[];
  }

  public async close(): Promise<void> {
    if (this._connection) {
      await this._connection.end();
      this._connection = null;
    }
  }
}
