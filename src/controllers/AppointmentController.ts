import { Response, Request } from "express";
import { IAppointmentController } from "../interfaces/controllers";
import { FindAppointmentService } from "../services/Appointment/FindAppointment";
import { AppointmentRepositorySqlite } from "../infra/database/sqlite/implementations/AppointmentRepository";
import { CreateAppointmentService } from "../services/Appointment/CreateAppointment";
import { PatchAppointmentService } from "../services/Appointment/PatchAppointment";

const createAppointmentService = new CreateAppointmentService(
  new AppointmentRepositorySqlite()
);

const findAppointmentService = new FindAppointmentService(
  new AppointmentRepositorySqlite()
);

const patchAppointmentService = new PatchAppointmentService(
  new AppointmentRepositorySqlite()
)

class AppointmentController implements IAppointmentController {
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

  async patch(req: Request, res: Response) {
    const { id, status } = req.params;
    const userReqId  = req.userReq.id;

    try {
      const result = await patchAppointmentService.execute({
        id,
        status,
        userReqId
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

export default new AppointmentController();
