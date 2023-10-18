import { Plan } from "../entities/Plan";

import { User } from "../entities/User";

export interface ResRegisterUser {
  user: User;
  token: string;
}

export interface IUsersRepository {
  create(props: User): Promise<Error | ResRegisterUser>;
  find(): Promise<User[]>;
  findOneUser(props: { userId: string }): Promise<Error | User>;
  updateUser(props: { userId: string, formData: any }): Promise<Error | User>;
  appendPlan(props: {
    planName: string;
    userId: string;
  }): Promise<Error | string>;
  deletePlan(props: { userId: string }): Promise<Error | string>;
}
