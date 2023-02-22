import { User } from "../entities/User";

export interface IUsersRepository{
    create(props: User):Promise<User>;
    find(): Promise<User[]>;
}