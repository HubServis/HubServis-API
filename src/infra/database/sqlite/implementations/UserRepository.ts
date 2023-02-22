import { User } from "../../../../entities/User";
import { IUsersRepository } from "../../../../repositories/UsersRepository";
import { User as UserSchema } from '../models/User';
import Database from '../config';

export class UserRepositorySqlite implements IUsersRepository{
    public async create(props: User): Promise<User> {
        const {id, name, email, password} = props;

        const userRepository = (await Database).getRepository(UserSchema)
        const user = await userRepository.save({id, name, email, password})

        return user;
    }


    public async find(): Promise<User[]>{
        const userRepository = (await Database).getRepository(UserSchema);
        const user = await userRepository.find();

        return user;
    }

    // public async find(): Promise<User[]> {
    //     const users = await UserSchema.find();
        
    //     return users;
    // }
}