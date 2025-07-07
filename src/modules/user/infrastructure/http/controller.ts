import { Controller } from '../../../../http';
import { createUserHandler } from './create-user';

export const UserController = new Controller()
  .add({ name: 'create', handler: createUserHandler })
  .build();
