import { Response, Request } from 'express';
import { Role } from "../entities/Role";
import { RoleRepositorySqlite } from '../infra/database/sqlite/implementations/RoleRepository';
import { CreateRoleService } from '../services/role/CreateRole';
import { IRoleCotroller } from '../interfaces/controllers';

const createRoleService = new CreateRoleService(new RoleRepositorySqlite());

class RoleController implements IRoleCotroller{
    
    async create(req: Request, res: Response){
        const { name, description } = req.body;

        try {
            const role = new Role({name, description});
            const result = await createRoleService.execute(role);
    
            if(result instanceof Error){
                return res.status(400).json(result.message);
            }

            return res.status(201).json(result);
        } catch (err) {
            console.log(err.message);
            return res.status(500).json('Unexpected error');
        }
    }
}

export default new RoleController();