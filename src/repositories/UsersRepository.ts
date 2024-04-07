import { User } from "../entities/User";

export interface ResRegisterUser {
  user: User;
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
  getUserPermissions(props: { userId: string, requestedPermissions: string[] }): Promise<boolean | Error>
}
