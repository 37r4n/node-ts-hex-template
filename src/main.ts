import { app } from './app';
import { config } from './config';
import { database } from './database';
import { Server } from './http';

const host = config.server.main.host;
const port = config.server.main.port;

database.connect();
new Server({ app, host, port }).start();
