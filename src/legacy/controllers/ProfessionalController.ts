import { Response, Request } from "express";
import { IProfessionalController } from "../interfaces/controllers";
import { CreateProfessionalService } from "../services/professional/CreateProfessional";
import { ProfessionalRepositoryPostgres } from "../infra/database/postgres/implementations/ProfessionalRepository";
import { Professional } from "../entities/Professional";
import { FindProfessionalsService } from "../services/professional/FindProfessionals";

const createProfessionalService = new CreateProfessionalService(
  new ProfessionalRepositoryPostgres()
);
const findProfessionalsService = new FindProfessionalsService(
  new ProfessionalRepositoryPostgres()
);

class ProfessionalController implements IProfessionalController {
  async addToBusiness(req: Request, res: Response) {
    const { name, cpfcnpj, isRegistered } = req.body;
    const userId = req.userReq.id;

    try {
      const role = new Professional({ name, cpfcnpj, isRegistered });
      const result = await createProfessionalService.execute(role, userId);

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      return res.status(201).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }

  async findProfessionals(req: Request, res: Response) {
    try {
      const result = await findProfessionalsService.execute();

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

export default new ProfessionalController();
