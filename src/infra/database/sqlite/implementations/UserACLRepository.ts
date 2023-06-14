import { hash } from "bcrypt";
import { In } from "typeorm";
import Database from "../config";
import { User } from "../../../../entities/User";
import { User as UserSchema } from "../models/User";
import { Role as RoleSchema } from "../models/Role";
import { Permission as PermissionSchema } from "../models/Permission";
import {
  IUsersACLRepository,
  UserACLRequest,
} from "../../../../repositories/UsersACLRepository";

export class UserACLRepositorySqlite implements IUsersACLRepository {
  public async create(props: UserACLRequest): Promise<Error | User> {
    const { userId, roles, permissions } = props;

    const userRepository = (await Database).getRepository(UserSchema);
    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new Error("User does not exists!");
    }

    const permissionRepository = (await Database).getRepository(
      PermissionSchema
    );
    const permissionsExists = await permissionRepository.findBy({
      id: In(permissions),
    });

    const roleRepository = (await Database).getRepository(RoleSchema);
    const rolesExists = await roleRepository.findBy({
      id: In(roles),
    });

    user.permissions = permissionsExists;
    user.roles = rolesExists;

    userRepository.save(user);

    return user;
  }
}
