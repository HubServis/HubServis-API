import { Response, Request } from "express";

import { IBusinessCotroller } from "../interfaces/controllers";
import { CreateBusinessService } from "../services/business/CreateBusiness";
import { FindBusinessService } from "../services/business/FindBusiness";
import { Business } from "../entities/Business";
import { BusinessRepositorySqlite } from "../infra/database/sqlite/implementations/BusinessRepository";
import { FindOneBusinessService } from "../services/business/FindOneBusiness";

const createBusinessService = new CreateBusinessService(
  new BusinessRepositorySqlite()
);
const findBusinessService = new FindBusinessService(
  new BusinessRepositorySqlite()
);

const findOneBusinessService = new FindOneBusinessService(
  new BusinessRepositorySqlite()
);

class BusinessController implements IBusinessCotroller {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    try {
      const business = new Business({ name });
      const result = await createBusinessService.execute(
        business,
        req.userReq.id
      );

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      return res.status(201).json({ res: result });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }

  async find(req: Request, res: Response) {
    try {
      const products = await findBusinessService.execute();
      return res.status(201).json(products);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }

  async findOne(req: Request, res: Response) {
    const { id: businessId } = req.params;

    try {
      const products = await findOneBusinessService.execute({
        businessId
      });
      return res.status(201).json(products);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }
}

export default new BusinessController();
