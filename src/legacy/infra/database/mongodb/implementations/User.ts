import { User } from "../../../../entities/User";
import { IUsersRepository } from "../../../../repositories/UsersRepository";
import UserSchema from "../models/User";

export class UserRepositoryMongoDB implements IUsersRepository {
  public async create(props: User): Promise<User> {
    const { id, name, email, password } = props;

    const user = await UserSchema.create({ id, name, email, password });

    return user;
  }

  public async find(): Promise<User[]> {
    const users = await UserSchema.find();

    return users;
  }
}
