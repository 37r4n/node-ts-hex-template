import { User } from './entity';

export interface UserRepository {
  findById({ id }: { id: string }): Promise<User | null>;
  findByEmail({ email }: { email: string }): Promise<User | null>;
  createOne({ entity }: { entity: User }): Promise<void>;
  updateById({ id, entity }: { id: string; entity: User }): Promise<void>;
  deleteById({ id }: { id: string }): Promise<void>;
}
