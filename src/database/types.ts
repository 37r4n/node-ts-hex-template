export interface DatabaseOptions {
  driver: string;
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}

export interface MotorOptions {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}

export interface QueryOptions {
  content: string;
  params?: any[];
}
