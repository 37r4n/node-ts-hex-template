import { BcryptHasher, CryptoIdGenerator } from '../../../../services';
import { CreateUser } from '../../application/usecases/create-user';
import { UserDatabase } from '../database/database';

export const createUserHandler = async (req: any, res: any): Promise<void> => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const usecase = new CreateUser({
    userRepository: new UserDatabase(),
    idGenerator: new CryptoIdGenerator(),
    hasher: new BcryptHasher(),
  });

  const data = await usecase.execute({ name, email, password });
  res.status(201).json({ data });
};
