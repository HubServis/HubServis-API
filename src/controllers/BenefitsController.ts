import { Request, Response } from "express";

import { Benefit } from "../entities/Benefits";
import { BenefitRepositorySqlite } from "../infra/database/sqlite/implementations/BenefitRepository";

import { IBenefitsController } from "../interfaces/controllers";

import { CreateBenefitService } from "../services/Benefits/CreateBenefit";
import { DeleteBenefitService } from "../services/Benefits/DeleteBenefits";
import { FindBenefitService } from "../services/Benefits/FindBenefits";
import { UpdateBenefitService } from "../services/Benefits/UpdateBenefits";

const createBenefitService = new CreateBenefitService(
  new BenefitRepositorySqlite()
);
const findBenefitService = new FindBenefitService(
  new BenefitRepositorySqlite()
);
const deleteBenefitService = new DeleteBenefitService(
  new BenefitRepositorySqlite()
);
const updateBenefitService = new UpdateBenefitService(
  new BenefitRepositorySqlite()
);

class BenefitsController implements IBenefitsController {
  async create(req: Request, res: Response) {
    const { name, description, max_value } = req.body;

    try {
      const benefit = new Benefit({
        name,
        description,
        max_value: Number(max_value),
      });

      const result = await createBenefitService.execute(benefit);

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      return res.status(201);
    } catch (err) {
      return res.status(500).json(`Unexpected Error ${err.message}`);
    }
  }

  async find(req: Request, res: Response) {
    const { name } = req.body;

    try {
      const result = await findBenefitService.execute(name);

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async delete(req: Request, res: Response) {
    const { name } = req.params;

    try {
      const result = await deleteBenefitService.execute(name);

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(201).json("OK");
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async patch(req: Request, res: Response) {
    const { benefitName } = req.params;
    const { name, description, max_value } = req.body;

    try {
      const result = await updateBenefitService.execute({
        benefitName,
        newBenefit: {
          name,
          description,
          max_value,
        },
      });

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(201).json("Updated!");
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }
}

export default new BenefitsController();
