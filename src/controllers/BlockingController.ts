import { Request, Response } from "express";
import { IExpedientController } from "../interfaces/controllers";
import { CreateEspedientService } from "../services/Espedient/CreateEspedient";
import { EspedientRepositorySqlite } from "../infra/database/sqlite/implementations/EspedientRepository";
import { Espedient } from "../entities/Espedient";
import { FindEspedientService } from "../services/Espedient/FindEspedient";
import { PatchEspedientService } from "../services/Espedient/PatchEspedient";
import { CustomError } from "../interfaces/errors";

const createEspedientService = new CreateEspedientService(
	new EspedientRepositorySqlite()
);

const findEspedientService = new FindEspedientService(
	new EspedientRepositorySqlite()
);

const patchEspedientService = new PatchEspedientService(
	new EspedientRepositorySqlite()
);

class BlockingController implements IExpedientController {
	async create(req: Request, res: Response): Promise<Response> {
		const { name, description, expediencysInfos } = req.body;
		const { id: userId } = req.userReq;

		try {
			const result = await createEspedientService.execute({
				userId,
				name,
				description,
				expediencysInfos,
			});

			if (result instanceof Error) return res.status(404).json(result.message);

			return res.status(200).json(result);
		} catch (err) {
			console.log(err.message);
			return res.status(500).json("Unexpected error");
		}
	}

	async find(req: Request, res: Response): Promise<Response> {
		const { businessId } = req.params;

		try {
			const result = await findEspedientService.execute(businessId);

			if (result instanceof Error) return res.status(404).json(result.message);

			return res.status(200).json(result);
		} catch (err) {
			console.log(err.message);
			return res.status(500).json("Unexpected error");
		}
	}

	async patch(req: Request, res: Response): Promise<Response> {
		const { name, description, expediencysInfos } = req.body;
		const { espedientId } = req.params;
		const { id: userId } = req.userReq;
		

		try {
			const result = await patchEspedientService.execute({
				userId,
				name,
				description,
				expediencysInfos,
				espedientId,
			});

			if(result instanceof CustomError) return res.status(result.statusCode).json(result.message);

			return res.status(200).json(result);
		} catch (err) {
			console.log(err.message);
			return res.status(500).json("Unexpected error");
		}
	}
}

export default new BlockingController();
