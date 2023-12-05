import { Response, Request } from "express";
import { IAppointmentController } from "../interfaces/controllers";
import { FindAppointmentService } from "../services/Appointment/FindAppointment";
import { AppointmentRepositorySqlite } from "../infra/database/sqlite/implementations/AppointmentRepository";
import { CreateAppointmentService } from "../services/Appointment/CreateAppointment";
import { PatchAppointmentService } from "../services/Appointment/PatchAppointment";
import { FindAppointmentUserService } from "../services/Appointment/FindAppointmentUser";
import { decriptCookie } from "../middleware/cookie";

const createAppointmentService = new CreateAppointmentService(
  new AppointmentRepositorySqlite()
);

const findAppointmentService = new FindAppointmentService(
  new AppointmentRepositorySqlite()
);

const findAppointmentUserService = new FindAppointmentUserService(
  new AppointmentRepositorySqlite()
);

const patchAppointmentService = new PatchAppointmentService(
  new AppointmentRepositorySqlite()
)

class AppointmentController implements IAppointmentController {
	async create(req: Request, res: Response) {
		const { date_time, client, service, professional } = req.body;

		const cookie = decriptCookie(req, res);

		if(!cookie) return res.status(401).json('user is not logged');

		try {
			const result = await createAppointmentService.execute({
				date_time,
				client: cookie.userId,
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

	async findAppointmentsUser(req: Request, res: Response) {
		const cookie = decriptCookie(req, res);

		if(!cookie) return res.status(401).json('user not autenticated!');

		const { userId: id } = cookie

		try {
			const result = await findAppointmentUserService.execute(id);

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
		const { date_time } = req.query;
		const userReqId = req.userReq.id;

		try {
			const result = await patchAppointmentService.execute({
				id,
				status,
				date_time,
				userReqId,
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
