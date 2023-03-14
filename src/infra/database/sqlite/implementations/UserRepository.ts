import { hash } from "bcrypt";
import Database from "../config";
import { User } from "../../../../entities/User";
import { User as UserSchema } from "../models/User";
import { IUsersRepository } from "../../../../repositories/UsersRepository";

export class UserRepositorySqlite implements IUsersRepository {
    public async create(props: User): Promise<Error | User> {
        const {id, username, email, password} = props;

        const existUser = (await Database).getRepository(UserSchema);
        const isExistUser = await existUser.findOne({
            where: {
                username: username
            }
        });

        if(isExistUser){
            return new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const userRepository = (await Database).getRepository(UserSchema);
        const user = await userRepository.save({id, username, email, password: passwordHash});

        return user;
    }

    public async find(): Promise<User[]> {
        const userRepository = (await Database).getRepository(UserSchema);
        const user = await userRepository.find();

        return user;
    }
}
