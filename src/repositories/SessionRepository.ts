import { User } from "../entities/User";

export type UserRequest = {
  email: string;
  password: string;
};

export interface IForgotPassword{
  email: string;
}

export interface ISessionRepository {
  handle(props: UserRequest): Promise<Error | any>;
  forgotPassword(props: IForgotPassword): Promise<Error | any>;
}