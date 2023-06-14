import { Role } from "../../../../entities/Role";
import { Role as RoleSchema } from "../models/Role";
import Database from "../config";
import { IRolesRepository } from "../../../../repositories/RolesRepository";

export class RoleRepositorySqlite implements IRolesRepository {
  public async create(props: Role): Promise<Error | Role> {
    const { id, name, description } = props;

    const roleRepository = (await Database).getRepository(RoleSchema);

    if (await roleRepository.findOne({ where: { name } })) {
      return new Error("Role already exists");
    }

    const role = await roleRepository.save({ id, name, description });

    return role;
  }
}
