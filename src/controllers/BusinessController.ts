import { Response, Request } from "express";

import { IBusinessCotroller } from "../interfaces/controllers";
import { CreateBusinessService } from "../services/business/CreateBusiness";
import { FindBusinessService } from "../services/business/FindBusiness";
import { Business } from "../entities/Business";
import { BusinessRepositorySqlite } from "../infra/database/sqlite/implementations/BusinessRepository";
import { FindOneBusinessService } from "../services/business/FindOneBusiness";
import { DeleteBusinessService } from "../services/business/DeleteBusiness";
import { PatchBusinessService } from "../services/business/PatchBusiness";

const createBusinessService = new CreateBusinessService(
  new BusinessRepositorySqlite()
);
const findBusinessService = new FindBusinessService(
  new BusinessRepositorySqlite()
);

const findOneBusinessService = new FindOneBusinessService(
  new BusinessRepositorySqlite()
);

const deleteBusinessService = new DeleteBusinessService(
  new BusinessRepositorySqlite()
);

const patchBusinessService = new PatchBusinessService(
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
      const result = await findOneBusinessService.execute({
        businessId
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

  async delete(req: Request, res: Response) {
    const { businessId } = req.params;
    const { id } = req.userReq;

    try {
      const result = await deleteBusinessService.execute({
        businessId,
        userId: id
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

  async patch(req: Request, res: Response) {
    const { id } = req.userReq;
    const { name, id: businessId } = req.body;

    try {
      const result = await patchBusinessService.execute({
        userId: id,
        newBusiness: {
          id: businessId,
          name
        }
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

export default new BusinessController();
