import { config } from './config';
import { Database } from './database/database';

export const database = new Database({
  driver: config.database.main.driver,
  host: config.database.main.host,
  port: config.database.main.port,
  name: config.database.main.name,
  user: config.database.main.user,
  password: config.database.main.password,
});
