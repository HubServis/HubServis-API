import { User } from "../entities/User";

export interface ResRegisterUser {
  user: User;
  token: string;
}

export interface IUsersRepository {
  create(props: User): Promise<Error | ResRegisterUser>;
  find(): Promise<User[]>;
}
