import { ConflictError } from '../../../../errors';
import { Hasher, IdGenerator } from '../../../../services';
import { User } from '../../domain/entity';
import { UserRepository } from '../../domain/repository';
import { CreateUserInput } from '../dtos/create-user-input';
import { CreateUserOutput } from '../dtos/create-user-output';

export class CreateUser {
  private readonly userRepository: UserRepository;
  private readonly idGenerator: IdGenerator;
  private readonly hasher: Hasher;

  constructor({
    userRepository,
    idGenerator,
    hasher,
  }: {
    userRepository: UserRepository;
    idGenerator: IdGenerator;
    hasher: Hasher;
  }) {
    this.userRepository = userRepository;
    this.idGenerator = idGenerator;
    this.hasher = hasher;
  }

  public async execute({ name, email, password }: CreateUserInput): Promise<CreateUserOutput> {
    const emailExists = await this.userRepository.findByEmail({ email });
    if (emailExists) throw new ConflictError({ message: 'Email already in use' });

    const newUser = new User({
      id: this.idGenerator.generate(),
      name,
      email,
      password: await this.hasher.hash({ raw: password }),
    });

    await this.userRepository.createOne({ entity: newUser });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }
}
