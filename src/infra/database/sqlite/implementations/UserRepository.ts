import { hash } from "bcrypt";
import { In } from "typeorm";
import Database from "../config";
import { User } from "../../../../entities/User";
import { User as UserSchema } from "../models/User";
import { Role as RoleSchema } from "../models/Role";
import { Permission as PermissionSchema } from "../models/Permission";
import { IUsersRepository } from "../../../../repositories/UsersRepository";

export class UserRepositorySqlite implements IUsersRepository {
    // public async createUserACL(props: UserACLRequest): Promise<Error | User> {
    //     const { userId, roles, permissions } = props;

    //     const userRepository = (await Database).getRepository(UserSchema);
    //     const user = await userRepository.findOne({
    //         where: {
    //             id: userId,
    //         },
    //     });

    //     if (user) {
    //         return new Error("User does not exists!");
    //     }

    //     const permissionRepository = (await Database).getRepository(PermissionSchema);
    //     const permissionsExists = await permissionRepository.findBy({
    //         id: In(permissions),
    //     });

    //     const roleRepository = (await Database).getRepository(RoleSchema);
    //     const rolesExists = await roleRepository.findBy({
    //         id: In(roles),
    //     });

    //     user.permissions = permissionsExists;
    //     user.roles = rolesExists;

    //     userRepository.save(user);
        
    //     return user;
    // }

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
