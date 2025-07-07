import 'dotenv/config';

export const config = {
  app: {
    name: process.env.APP_NAME ?? 'node-hex-template',
    version: process.env.APP_VERSION ?? '1.0.0',
  },

  env: {
    mode: process.env.NODE_ENV ?? 'development',
    level: process.env.LOG_LEVEL ?? 'debug',
    debug: process.env.DEBUG === 'true',
  },

  server: {
    main: {
      host: process.env.HOST ?? '127.0.0.1',
      port: process.env.PORT ? Number(process.env.PORT) : 8080,
    },
  },

  database: {
    main: {
      driver: process.env.DATABASE_DRIVER ?? 'mysql',
      host: process.env.DATABASE_HOST ?? '127.0.0.1',
      port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306,
      name: process.env.DATABASE_NAME ?? 'database',
      user: process.env.DATABASE_USER ?? 'root',
      password: process.env.DATABASE_PASSWORD ?? '',
    },
  },
};
