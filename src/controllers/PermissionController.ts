import { Response, Request } from "express";
import { Permission } from "../entities/Permission";
import { PermissionRepositorySqlite } from "../infra/database/sqlite/implementations/PermissionRepository";
import { IPermissionController } from "../interfaces/controllers";
import { CreatePermissionService } from "../services/permission/CreatePermission";

const createPermissionService = new CreatePermissionService(
  new PermissionRepositorySqlite()
);

class PermissionController implements IPermissionController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    try {
      const permission = new Permission({ name, description });
      const result = await createPermissionService.execute(permission);

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      return res.status(201).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }
}

export default new PermissionController();
