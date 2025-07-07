import { App, json } from './http';
import { UserRouter } from './modules/user';

export const app = new App()
  .middleware({ handler: json() })
  .router({ path: '/api/v1', handler: UserRouter }).build();
