import { Request, Response } from "express";
import { IExtrasController } from "../interfaces/controllers";
import { Extra } from "../entities/Extra";
import { ExtraRepositorySqlite } from "../infra/database/sqlite/implementations/ExtraRepository";
import { CreateExtraService } from "../services/Extras/CreateExtra";

const createExtrasService = new CreateExtraService(
  new ExtraRepositorySqlite()
);

class ExtraController implements IExtrasController {
  async create(req: Request, res: Response) {
    const { name, description, value, isControllable, role } = req.body;

    try {
      const extra = new Extra({
        name,
        description,
        value: Number(value),
        isControllable,
        role,
      });

      const result = await createExtrasService.execute(extra);

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error ${err.message}`);
    }
  }

  // async find(req: Request, res: Response) {
  //   // const { name } = req.params;

  //   try {
  //     const result = await findLimitsService.execute();

  //     // if (result instanceof Error) return res.status(400).json(result.message);

  //     return res.status(200).json(result);
  //   } catch (err) {
  //     return res.status(500).json(`Unexpected Error: ${err.message}`);
  //   }
  // }

  // async delete(req: Request, res: Response) {
  //   const { id } = req.params;

  //   try {
  //     const result = await deleteLimitsService.execute(id);

  //     if (result instanceof Error) return res.status(400).json(result.message);

  //     return res.status(201).json(result);
  //   } catch (err) {
  //     return res.status(500).json(`Unexpected Error: ${err.message}`);
  //   }
  // }

  // async patch(req: Request, res: Response) {
  //   const { id, name, description, value, isControllable, role } = req.body;

  //   try {
  //     const result = await patchLimitsService.execute({
  //       newLimit: {
  //         id,
  //         name,
  //         description,
  //         value,
  //         isControllable,
  //         role,
  //       },
  //     });

  //     if (result instanceof Error) return res.status(400).json(result.message);

  //     return res.status(201).json(result);
  //   } catch (err) {
  //     return res.status(500).json(`Unexpected Error: ${err.message}`);
  //   }
  // }
}

export default new ExtraController();
