import { User } from "../entities/User";

export type UserRequest = {
    username: string;
    password: string;
}

export interface ISessionRepository{
    handle(props: UserRequest):Promise<Error | any>;
}