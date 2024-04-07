export type UserRequest = {
  email: string;
  user: string;
  expiration: number;
};

export interface ISessionRepository {
  handle(props: UserRequest): Promise<Error | any>;
  isExpired(expiration: number): Promise<Error | boolean>;
}
