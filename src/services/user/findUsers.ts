import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/UsersRepository";

export class FindUserService{
    constructor(
        private usersRepository: IUsersRepository
    ){}

    public async execute():Promise<User[]>{
        const users = await this.usersRepository.find();
        return users;
    }
}