import { Request, Response } from "express";
import { ILimitsController } from "../interfaces/controllers";
import { Limit } from "../entities/Limit";
import { CreateLimitService } from "../services/Limits/CreateLimit";
import { LimitsRepositorySqlite } from "../infra/database/sqlite/implementations/LimitRepository";
import { FindLimitService } from "../services/Limits/FindLimit";
import { DeleteLimitService } from "../services/Limits/DeleteLimit";
import { PatchLimitService } from "../services/Limits/PatchLimit";

const createLimitsService = new CreateLimitService(
  new LimitsRepositorySqlite()
);
const findLimitsService = new FindLimitService(new LimitsRepositorySqlite());
const deleteLimitsService = new DeleteLimitService(
  new LimitsRepositorySqlite()
);
const patchLimitsService = new PatchLimitService(new LimitsRepositorySqlite());

class LimitController implements ILimitsController {
  async create(req: Request, res: Response) {
    const { name, description, value, isControllable, role } = req.body;

    try {
      const limit = new Limit({
        name,
        description,
        value: Number(value),
        isControllable,
        role,
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

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const result = await deleteLimitsService.execute(id);

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async patch(req: Request, res: Response) {
    const { id, name, description, value, isControllable, role } = req.body;

    try {
      const result = await patchLimitsService.execute({
        newLimit: {
          id,
          name,
          description,
          value,
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

export default new LimitController();
