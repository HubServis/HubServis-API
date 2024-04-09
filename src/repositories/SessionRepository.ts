export type UserRequest = {
  email: string;
  user: string;
  expiration: string;
};

export interface ISessionRepository {
  createSession(props: UserRequest): Promise<Error | any>;
  hasToken(user: string): Promise<any>;
  removeSession(user: string): Promise<Error | boolean>;
}
