import { Response, Request } from "express";
import { ICategoryController } from "../interfaces/controllers";
import { FindAppointmentService } from "../services/Appointment/FindAppointment";
import { AppointmentRepositorySqlite } from "../infra/database/sqlite/implementations/AppointmentRepository";
import { CreateAppointmentService } from "../services/Appointment/CreateAppointment";
import { PatchAppointmentService } from "../services/Appointment/PatchAppointment";
import { CategoryRepositorySqlite } from "../infra/database/sqlite/implementations/CategoryRepository";
import { CreateCategoryService } from "../services/Category/CreateCategory";
import { FindCategoryService } from "../services/Category/FindCategory";

const createAppointmentService = new CreateCategoryService(
  new CategoryRepositorySqlite()
);

const findCategoryService = new FindCategoryService(
  new CategoryRepositorySqlite()
);

class CategoryController implements ICategoryController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;
    const userId = req.userReq.id;

    try {
      const result = await createAppointmentService.execute({
        name,
        description,
        userId
      });

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      return res.status(201).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }

  async find(req: Request, res: Response) {
    try {
      const result = await findCategoryService.execute();

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

export default new CategoryController();
