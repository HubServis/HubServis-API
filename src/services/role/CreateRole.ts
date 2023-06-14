import { Role } from "../../entities/Role";
import { IRolesRepository } from "../../repositories/RolesRepository";

export class CreateRoleService {
  constructor(private rolesRepository: IRolesRepository) {}

  public async execute(props: Role) {
    const role = await this.rolesRepository.create(props);
    return role;
  }
}
