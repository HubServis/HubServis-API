import { Role } from "../../../../entities/Role";
import { Role as RoleSchema } from "../models/Role";
import { Permission as PermissionSchema } from "../models/Permission";
import Database from "../config";
import {
    IRolesPermissionsRepository,
    RolePermissionRequest,
} from "../../../../repositories/RolesPermissionsRepository";
import { In } from "typeorm";

export class RolePermissionRepositorySqlite
    implements IRolesPermissionsRepository
{
    public async create(props: RolePermissionRequest): Promise<Error | Role> {
        const { roleId, permissions } = props;

        const roleRepository = (await Database).getRepository(RoleSchema);

        const role = await roleRepository.findOne({
            where: {
                id: roleId,
            },
        });

        if (!role) {
            return new Error("Role does not exists!");
        }

        const permissionRepository = (await Database).getRepository(
            PermissionSchema
        );

        const permissionsExists = await permissionRepository.findBy({
            id: In(permissions),
        });

        role.permissions = permissionsExists;
        
        await roleRepository.save(role);

        return role;
    }
}
