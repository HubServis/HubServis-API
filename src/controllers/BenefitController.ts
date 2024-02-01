import { Request, Response } from "express";

import { Benefit } from "../entities/Benefit";
import { BenefitRepositoryPostgres } from "../infra/database/postgres/implementations/BenefitRepository";

import { IBenefitsController } from "../interfaces/controllers";

import { CreateBenefitService } from "../services/Benefits/CreateBenefit";
import { DeleteBenefitService } from "../services/Benefits/DeleteBenefit";
import { FindBenefitService } from "../services/Benefits/FindBenefits";
import { UpdateBenefitService } from "../services/Benefits/UpdateBenefit";

const createBenefitService = new CreateBenefitService(
  new BenefitRepositoryPostgres()
);
const findBenefitService = new FindBenefitService(
  new BenefitRepositoryPostgres()
);
const deleteBenefitService = new DeleteBenefitService(
  new BenefitRepositoryPostgres()
);
const updateBenefitService = new UpdateBenefitService(
  new BenefitRepositoryPostgres()
);

class BenefitsController implements IBenefitsController {
  async create(req: Request, res: Response) {
    const { name, description, max_value, isControllable, role } = req.body;

    try {
      const benefit = new Benefit({
        name,
        description,
        max_value: Number(max_value),
        isControllable,
        role,
      });

      const result = await createBenefitService.execute(benefit);

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(201).json(result);
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
    const { benefitName } = req.params;

    try {
      const result = await deleteBenefitService.execute(benefitName);

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async patch(req: Request, res: Response) {
    const { benefitName } = req.params;
    const { id, name, description, max_value, isControllable, role } = req.body;

    try {
      const result = await updateBenefitService.execute({
        benefitName,
        newBenefit: {
          id,
          name,
          description,
          max_value,
          isControllable,
          role,
        },
      });

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }
}

export default new BenefitsController();
