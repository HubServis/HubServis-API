import { Response, Request } from "express";
import { ICategoryController } from "../interfaces/controllers";
import { FindAppointmentService } from "../services/Appointment/FindAppointment";
import { AppointmentRepositorySqlite } from "../infra/database/sqlite/implementations/AppointmentRepository";
import { CreateAppointmentService } from "../services/Appointment/CreateAppointment";
import { PatchAppointmentService } from "../services/Appointment/PatchAppointment";

const createAppointmentService = new CreateAppointmentService(
  new AppointmentRepositorySqlite()
);

class CategoryController implements ICategoryController {
  async create(req: Request, res: Response) {
    const { date_time, client, service, professional } = req.body;

    try {
      const result = await createAppointmentService.execute({
        date_time,
        client,
        service,
        professional,
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
}

export default new CategoryController();
