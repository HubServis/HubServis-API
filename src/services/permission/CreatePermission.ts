import { Permission } from "../../entities/Permission";
import { IPermissionsRepository } from "../../repositories/PermissionsRepository";

export class CreatePermissionService{
    constructor(
        private permissionsRepository: IPermissionsRepository
    ){}

    public async execute(props: Permission){
        const role = await this.permissionsRepository.create(props);
        return role;
    }
}