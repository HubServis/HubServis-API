import { Permission } from "../../../../entities/Permission";
import { Permission as PermissionSchema } from "../models/Permission";
import Database from "../config";
import { IPermissionsRepository } from "../../../../repositories/PermissionsRepository";

export class PermissionRepositorySqlite implements IPermissionsRepository {
  public async create(props: Permission): Promise<Error | Permission> {
    const { id, name, description } = props;

    const permissionRepository = (await Database).getRepository(
      PermissionSchema
    );

    if (await permissionRepository.findOne({ where: { name } })) {
      return new Error("Permission already exists");
    }

    const permission = await permissionRepository.save({
      id,
      name,
      description,
    });

    return permission;
  }
}
