import { Request, Response } from "express";

import { Benefit } from "../entities/Benefits";
import { BenefitRepositorySqlite } from "../infra/database/sqlite/implementations/BenefitRepository";

import { IBenefitsController } from "../interfaces/controllers";
import { CreateBenefitService } from "../services/Benefits/CreateBenefit";

const createBenefitService = new CreateBenefitService(
  new BenefitRepositorySqlite()
);

class BenefitsController implements IBenefitsController {
  async create(req: Request, res: Response) {
    const { name, description, price } = req.body;

    try {
      const benefit = new Benefit({
        name,
        description,
        max_value: Number(price),
      });

      const createdBenefit = await createBenefitService.execute(benefit);

      if (createdBenefit instanceof Error) {
        return res.status(400).json(createdBenefit.message);
      }
    } catch (err) {
      console.log(err.message);

      return res.status(500).json("Unexpected Error");
    }
  }

  async find(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}

  async patch(req: Request, res: Response) {
    const { name, description, max_value } = req.body;

    try {
    } catch (err) {}
  }
}

export default new BenefitsController();
