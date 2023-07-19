import { User } from "../entities/User";

export type UserACLRequest = {
  userId: string;
  roles: string[];
  permissions: string[];
};

export interface IUsersACLRepository {
  create(props: UserACLRequest): Promise<Error | User>;
}
