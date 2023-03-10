import { User } from "../entities/User";

export interface IUsersRepository{
    create(props: User):Promise<Error | User>;
    find(): Promise<User[]>;
}