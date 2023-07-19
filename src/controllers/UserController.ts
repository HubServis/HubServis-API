import { Response, Request } from "express";
import { IUserCotroller } from "../interfaces/controllers";
import { User } from "../entities/User";
import { FindUserService } from "../services/user/findUsers";
import { CreateUserService } from "../services/user/CreateUser";
import { UserRepositorySqlite } from "../infra/database/sqlite/implementations/UserRepository";
import { AppendPlanUserService } from "../services/user/AppendPlanUser";
import { DeletePlanUserService } from "../services/user/DeletePlanUser";

const createUserService = new CreateUserService(new UserRepositorySqlite());
const findUserService = new FindUserService(new UserRepositorySqlite());
const appendPlanUserService = new AppendPlanUserService(
  new UserRepositorySqlite()
);
const deletePlanUserService = new DeletePlanUserService(
  new UserRepositorySqlite()
);

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

  async find(_: Request, res: Response) {
    try {
      const users = await findUserService.execute();
      return res.status(201).json(users);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }

  async appendPlan(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, planName } = req.params;

      const result = await appendPlanUserService.execute({ userId, planName });

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  async deletePlan(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      const result = await deletePlanUserService.execute({ userId });

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

export default new UserController();
