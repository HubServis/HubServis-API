import { Response, Request } from "express";
import { CreateServiceService } from "../services/service/CreateService";
import { FindServiceService } from "../services/service/FindService";
import { IServiceCotroller } from "../interfaces/controllers";
import { Service } from "../entities/Service";
import { ServiceRepositorySqlite } from "../infra/database/sqlite/implementations/ServiceRepository";

const createServiceService = new CreateServiceService(
  new ServiceRepositorySqlite()
);
const findServiceService = new FindServiceService(
  new ServiceRepositorySqlite()
);

class ServiceController implements IServiceCotroller {
  async create(req: Request, res: Response) {
    const { name, price, duration, description } = req.body;

    try {
      const service = new Service({ name, price, duration, description });
      const result = await createServiceService.execute(
        service,
        req.userReq.id
      );

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      return res.status(201).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }

  async find(req: Request, res: Response) {
    try {
      const result = await findServiceService.execute();

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

export default new ServiceController();
