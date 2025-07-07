import { Email, Name, Password, Uuid } from '../../../value-objects';

export class User {
  private readonly _id: Uuid;
  private readonly _name: Name;
  private readonly _email: Email;
  private _password: Password;

  constructor({ id, name, email, password }: { id: string; name: string; email: string; password: string }) {
    this._id = new Uuid({ value: id });
    this._name = new Name({ value: name });
    this._email = new Email({ value: email });
    this._password = new Password({ value: password });
  }

  public get id(): string {
    return this._id.value;
  }

  public get name(): string {
    return this._name.value;
  }

  public get email(): string {
    return this._email.value;
  }

  public get password(): string {
    return this._password.value;
  }
}
