import { Response, Request } from "express";
import { IUserCotroller } from "../interfaces/controllers";
import { User } from "../entities/User";
import { FindUserService } from "../services/user/findUsers";
import { CreateUserService } from "../services/user/CreateUser";
import { UserRepositorySqlite } from "../infra/database/sqlite/implementations/UserRepository";

const createUserService = new CreateUserService(new UserRepositorySqlite());
const findUserService = new FindUserService(new UserRepositorySqlite());

class UserController implements IUserCotroller {
  async create(req: Request, res: Response) {
    const { username, email, password, name, cpfcnpj } = req.body;

    try {
      const user = new User({ username, email, password, cpfcnpj, name });
      const createdUser = await createUserService.execute(user);

      if (createdUser instanceof Error) {
        return res.status(400).json(createdUser.message);
      }

      return res.status(201).json(createdUser);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }

  async find(req: Request, res: Response) {
    try {
      const users = await findUserService.execute();
      return res.status(201).json(users);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }
}

export default new UserController();
