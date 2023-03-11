import { Role } from "../entities/Role";

export type RolePermissionRequest = {
    roleId: string;
    permissions: string[];
};

export interface IRolesPermissionsRepository{
    create(props: RolePermissionRequest):Promise<Error | Role>;
}