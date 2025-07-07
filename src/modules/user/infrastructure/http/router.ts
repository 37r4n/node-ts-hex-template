import { Router } from '../../../../http';
import { UserController } from './controller';

export const UserRouter = new Router().post({ path: '/users', handler: UserController.create }).build();
