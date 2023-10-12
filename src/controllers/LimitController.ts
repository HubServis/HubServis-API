import { Request, Response } from "express";
import { PlansRepositorySqlite } from "../infra/database/sqlite/implementations/PlanRepository";

import { ILimitsController, IPlansController } from "../interfaces/controllers";

import { Limit } from "../entities/Limit";
import { CreateLimitService } from "../services/Limits/CreateLimit";
import { LimitsRepositorySqlite } from "../infra/database/sqlite/implementations/LimitRepository";
import { createECDH } from "crypto";
import { FindLimitService } from "../services/Limits/FindLimit";

const createLimitsService = new CreateLimitService(new LimitsRepositorySqlite());
const findLimitsService = new FindLimitService(new LimitsRepositorySqlite());

// const deletePlansService = new DeletePlanService(new PlansRepositorySqlite());
// const updatePlansService = new UpdatePlanService(new PlansRepositorySqlite());
// const appendPlansBenefitService = new AppendPlanBenefitService(
//   new PlansRepositorySqlite()
// );
// const deletePlansBenefitService = new DeletePlanBenefitService(
//   new PlansRepositorySqlite()
// );

class LimitController implements ILimitsController {
  async create(req: Request, res: Response) {
    const {
      name,
      description,
      value,
      isControllable,
      role
    } = req.body;

    try {
      const limit = new Limit({
        name,
        description,
        value: Number(value),
        isControllable,
        role
      });

      const result = await createLimitsService.execute(limit);

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error ${err.message}`);
    }
  }

  async find(req: Request, res: Response) {
    // const { name } = req.params;

    try {
      const result = await findLimitsService.execute();

      // if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  // async delete(req: Request, res: Response) {
  //   const { name } = req.params;

  //   try {
  //     const result = await deletePlansService.execute(name);

  //     if (result instanceof Error) return res.status(400).json(result.message);

  //     return res.status(201).json("OK");
  //   } catch (err) {
  //     return res.status(500).json(`Unexpected Error: ${err.message}`);
  //   }
  // }

  // async patch(req: Request, res: Response) {
  //   const { planName } = req.params;
  //   const {
  //     id,
  //     name,
  //     price,
  //     benefits,
  //     description,
  //     // month_price,
  //     // client_limit,
  //     // customer_limit,
  //     // reminder_limit,
  //     // professional_limit,
  //   } = req.body;

  //   try {
  //     const result = await updatePlansService.execute({
  //       planName,
  //       newPlan: {
  //         id,
  //         name,
  //         price,
  //         benefits,
  //         description,
  //         // month_price,
  //         // client_limit,
  //         // customer_limit,
  //         // reminder_limit,
  //         // professional_limit,
  //         isPrivated: true
  //       },
  //     });

  //     if (result instanceof Error) return res.status(400).json(result.message);

  //     return res.status(201).json("Updated!");
  //   } catch (err) {
  //     return res.status(500).json(`Unexpected Error: ${err.message}`);
  //   }
  // }

  // async appendBenefit(req: Request, res: Response): Promise<Response> {
  //   const { planName, benefitName } = req.params;

  //   try {
  //     const result = await appendPlansBenefitService.execute({
  //       planName,
  //       benefitName,
  //     });

  //     if (result instanceof Error) return res.status(400).json(result.message);

  //     return res.status(200).json(result);
  //   } catch (err) {
  //     return res.status(500).json(`Unexpected Error: ${err.message}`);
  //   }
  // }

  // async deleteBenefit(req: Request, res: Response): Promise<Response> {
  //   const { planName, benefitName } = req.params;

  //   try {
  //     const result = await deletePlansBenefitService.execute({
  //       planName,
  //       benefitName,
  //     });

  //     if (result instanceof Error) return res.status(400).json(result.message);

  //     return res.status(200).json(result);
  //   } catch (err) {
  //     return res.status(500).json(`Unexpected Error: ${err.message}`);
  //   }
  // }
}

export default new LimitController();
