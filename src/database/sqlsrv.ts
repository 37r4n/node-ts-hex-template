import sql, { ConnectionPool } from 'mssql';
import { Host, Port } from '../value-objects';
import { MotorOptions, QueryOptions } from './types';
import { InternalServerError } from '../errors';

export class Sqlsrv {
  private readonly _host: Host;
  private readonly _port: Port;
  private readonly _name: string;
  private readonly _user: string;
  private readonly _password: string;
  private _connection: ConnectionPool | null = null;

  constructor({ host, port, name, user, password }: MotorOptions) {
    this._host = new Host({ value: host });
    this._port = new Port({ value: port });
    this._name = name;
    this._user = user;
    this._password = password;
  }

  public async connect(): Promise<void> {
    if (this._connection) return;

    this._connection = await sql.connect({
      server: this._host.value,
      port: this._port.value,
      database: this._name,
      user: this._user,
      password: this._password,
    });
  }

  public async query<T = any>({ content, params = [] }: QueryOptions): Promise<T[]> {
    if (!this._connection) throw new InternalServerError({ message: 'Database has not connected' });
    const request = this._connection.request();
    params.forEach((param, index) => {
      request.input(`param${index}`, param);
    });
    const result = await request.query<T>(this.replace({ content }));
    return result.recordset;
  }

  private replace({ content }: { content: string }) {
    let i = 0;
    return content.replace(/\?/g, () => `@param${i++}`);
  }

  public async close(): Promise<void> {
    if (this._connection) {
      await this._connection.close();
      this._connection = null;
    }
  }
}
