import { Response, Request } from "express";
import { CreateServiceService } from "../services/service/CreateService";
import { IAppointmentController } from "../interfaces/controllers";
import { Service } from "../entities/Service";
import { ServiceRepositorySqlite } from "../infra/database/sqlite/implementations/ServiceRepository";
import { FindAppointmentService } from "../services/Appointment/FindService";
import { AppointmentRepositorySqlite } from "../infra/database/sqlite/implementations/AppointmentRepository";
import { CreateAppointmentService } from "../services/Appointment/CreateService";
import { Appointment } from "../entities/Appointment";

const createAppointmentService = new CreateAppointmentService(
  new AppointmentRepositorySqlite()
);

const findAppointmentService = new FindAppointmentService(
  new AppointmentRepositorySqlite()
);

class AppointmentController implements IAppointmentController {
  async create(req: Request, res: Response) {
    // const { name, price, duration, description } = req.body;

    try {
      const appointment = new Appointment({date_time: "", status: ""});
      const result = await createAppointmentService.execute(
        appointment,
        req.userReq.id
      );

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
      const result = await findAppointmentService.execute();

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

export default new AppointmentController();