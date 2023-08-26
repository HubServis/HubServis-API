import { User } from "../entities/User";
import { Response, Request } from "express";
import { IUserACLCotroller } from "../interfaces/controllers";
import { CreateUserAccessControlListService } from "../services/user/CreateUserAccessControlList";
import { UserACLRepositorySqlite } from "../infra/database/sqlite/implementations/UserACLRepository";

const createUserAccessControlListService =
  new CreateUserAccessControlListService(new UserACLRepositorySqlite());

class UserController implements IUserACLCotroller {
  async create(req: Request, res: Response) {
    const { roles, permissions } = req.body;
    const userId = req.userReq.id;
    // const userId = "a18f572e-e3a5-4747-8fe4-a6269c1bad57"; // quando implementar session retirar essa linha e ativar a de acima

    try {
      const result = await createUserAccessControlListService.execute({
        userId,
        permissions,
        roles,
      });

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

export default new UserController();
