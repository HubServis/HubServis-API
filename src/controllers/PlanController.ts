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
import { AppendPlanLimitService } from "../services/Plans/AppendPlanLimits";
import { DeletePlanLimitService } from "../services/Plans/DeletePlanLimits";

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

const appendPlansLimitService = new AppendPlanLimitService(
  new PlansRepositorySqlite()
);
const deletePlansLimitService = new DeletePlanLimitService(
  new PlansRepositorySqlite()
);

class PlansController implements IPlansController {
  async create(req: Request, res: Response) {
    const {
      name,
      price,
      description,
      // month_price,
      // client_limit,
      // customer_limit,
      // reminder_limit,
      // professional_limit,
    } = req.body;

    try {
      const benefit = new Plan({
        name,
        price,
        benefits: [],
        description,
        // month_price,
        // customer_limit,
        // client_limit,
        // reminder_limit,
        // professional_limit,
        isPrivated: true,
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
    const { idPlan: id } = req.params;

    try {
      const result = await deletePlansService.execute(id);

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async patch(req: Request, res: Response) {
    const {
      planId,
      name,
      price,
      description,
    } = req.body;

    try {
      const result = await updatePlansService.execute({
        planId,
        name,
        price,
        description
      });

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(201).json("Updated!");
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async appendBenefit(req: Request, res: Response): Promise<Response> {
    const { planId, benefitsId } = req.body;

    try {
      if(!benefitsId || benefitsId?.length == 0) return res.status(400).json("Benefits ID not informed!");

      const result = await appendPlansBenefitService.execute({
        planId,
        benefitsId
      });

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async deleteBenefit(req: Request, res: Response): Promise<Response> {
    const { planId, benefitId } = req.params;

    try {
      const result = await deletePlansBenefitService.execute({
        planId,
        benefitId,
      });

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async appendLimit(req: Request, res: Response): Promise<Response> {
    const { planId, limitsId } = req.body;

    try {
      if(!limitsId || limitsId?.length == 0) return res.status(400).json("Limits ID not informed!");

      const result = await appendPlansLimitService.execute({
        planId,
        limitsId
      });

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async deleteLimit(req: Request, res: Response): Promise<Response> {
    const { planId, limitId } = req.params;

    try {
      const result = await deletePlansLimitService.execute({
        planId,
        limitId,
      });

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }
}

export default new PlansController();
