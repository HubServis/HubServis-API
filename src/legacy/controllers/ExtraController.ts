import { Request, Response } from "express";
import { IExtrasController } from "../interfaces/controllers";
import { Extra } from "../entities/Extra";
import { ExtraRepositoryPostgres } from "../infra/database/postgres/implementations/ExtraRepository";
import { CreateExtraService } from "../services/Extras/CreateExtra";
import { FindExtraService } from "../services/Extras/FindExtra";
import { DeleteExtraService } from "../services/Extras/DeleteExtra";
import { UpdateExtraService } from "../services/Extras/UpdateExtra";

const createExtrasService = new CreateExtraService(
  new ExtraRepositoryPostgres()
);

const findExtrasService = new FindExtraService(new ExtraRepositoryPostgres());
const deleteExtrasService = new DeleteExtraService(new ExtraRepositoryPostgres());
const updateExtraService = new UpdateExtraService(new ExtraRepositoryPostgres());

class ExtraController implements IExtrasController {
  async create(req: Request, res: Response) {
    const { id } = req.userReq;
    const { name, description, value, isControllable, role } = req.body;

    try {
      const extra = new Extra({
        name,
        description,
        value: Number(value),
        isControllable,
        role,
      });

      const result = await createExtrasService.execute({
        userId: id,
        newExtra: extra
      });

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error ${err.message}`);
    }
  }

  async find(req: Request, res: Response) {
    try {
      const result = await findExtrasService.execute();

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const result = await deleteExtrasService.execute(id);

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json(`Unexpected Error: ${err.message}`);
    }
  }

  async patch(req: Request, res: Response) {
    const { id, name, description, value, isControllable, role } = req.body;

    try {
      const result = await updateExtraService.execute({
        newExtra: {
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

export default new ExtraController();
