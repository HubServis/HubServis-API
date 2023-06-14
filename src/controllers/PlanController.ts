import { Request, Response } from "express";
import { PlansRepositorySqlite } from "../infra/database/sqlite/implementations/PlanRepository";

import { IPlansController } from "../interfaces/controllers";

import { DeletePlanBenefitService } from "../services/Plans/DeletePlanBenefits";
import { AppendPlanBenefitService } from "../services/Plans/AppendPlanBenefits";
import { Plan } from "../entities/Plan";
import { FindPlanService } from "../services/Plans/FindPlans";
import { CreatePlanService } from "../services/Plans/CreatePlan";
import { DeletePlanService } from "../services/Plans/DeletePlan";
import { UpdatePlanService } from "../services/Plans/UpdatePlan";

const createPlansService = new CreatePlanService(new PlansRepositorySqlite());
const findPlansService = new FindPlanService(new PlansRepositorySqlite());

const deletePlansService = new DeletePlanService(new PlansRepositorySqlite());
const updatePlansService = new UpdatePlanService(new PlansRepositorySqlite());
const appendPlansBenefitService = new AppendPlanBenefitService(
  new PlansRepositorySqlite()
);
const deletePlansBenefitService = new DeletePlanBenefitService(
  new PlansRepositorySqlite()
);

class PlansController implements IPlansController {
  async create(req: Request, res: Response) {
    const {
      name,
      price,
      description,
      month_price,
      client_limit,
      customer_limit,
      reminder_limit,
      professional_limit,
    } = req.body;

    try {
      const benefit = new Plan({
        name,
        price,
        benefits: [],
        description,
        month_price,
        customer_limit,
        client_limit,
        reminder_limit,
        professional_limit,
      });

      const result = await createPlansService.execute(benefit);

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error ${err.message}`);
    }
  }

  async find(req: Request, res: Response) {
    const { name } = req.params;

    try {
      const result = await findPlansService.execute(name);

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async delete(req: Request, res: Response) {
    const { name } = req.params;

    try {
      const result = await deletePlansService.execute(name);

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(201).json("OK");
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async patch(req: Request, res: Response) {
    const { planName } = req.params;
    const {
      id,
      name,
      price,
      benefits,
      description,
      month_price,
      client_limit,
      customer_limit,
      reminder_limit,
      professional_limit,
    } = req.body;

    try {
      const result = await updatePlansService.execute({
        planName,
        newPlan: {
          id,
          name,
          price,
          benefits,
          description,
          month_price,
          client_limit,
          customer_limit,
          reminder_limit,
          professional_limit,
        },
      });

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(201).json("Updated!");
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async appendBenefit(req: Request, res: Response): Promise<Response> {
    const { planName, benefitName } = req.params;

    try {
      const result = await appendPlansBenefitService.execute({
        planName,
        benefitName,
      });

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async deleteBenefit(req: Request, res: Response): Promise<Response> {
    const { planName, benefitName } = req.params;

    try {
      const result = await deletePlansBenefitService.execute({
        planName,
        benefitName,
      });

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }
}

export default new PlansController();
