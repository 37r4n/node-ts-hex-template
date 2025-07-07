import { database } from '../../../../database';
import { User } from '../../domain/entity';
import { UserRepository } from '../../domain/repository';

export class UserDatabase implements UserRepository {
  public async findById({ id }: { id: string }): Promise<User | null> {
    const rows = await database.query({
      content: 'SELECT id, name, email, password FROM users WHERE id = ? LIMIT 1',
      params: [id],
    });

    const row = rows[0];
    if (!row) return null;

    return new User({
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password,
    });
  }

  public async findByEmail({ email }: { email: string }): Promise<User | null> {
    const rows = await database.query({
      content: 'SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1',
      params: [email],
    });

    const row = rows[0];
    if (!row) return null;

    return new User({
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password,
    });
  }

  public async createOne({ entity }: { entity: User }): Promise<void> {
    await database.query({
      content: 'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
      params: [entity.id, entity.name, entity.email, entity.password],
    });
  }

  public async updateById({ id, entity }: { id: string; entity: User }): Promise<void> {
    await database.query({
      content: 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
      params: [entity.name, entity.email, entity.password, id],
    });
  }

  public async deleteById({ id }: { id: string }): Promise<void> {
    await database.query({
      content: 'DELETE FROM users WHERE id = ?',
      params: [id],
    });
  }
}
