import {
  IRolesPermissionsRepository,
  RolePermissionRequest,
} from "../../repositories/RolesPermissionsRepository";

export class CreateRolePermissionService {
  constructor(
    private rolesPermissionsRepository: IRolesPermissionsRepository
  ) {}

  public async execute(props: RolePermissionRequest) {
    const rolePermission = await this.rolesPermissionsRepository.create(props);
    return rolePermission;
  }
}
