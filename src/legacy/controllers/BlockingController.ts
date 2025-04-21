import { Request, Response } from "express";
import { IBlockingController } from "../interfaces/controllers";
import { BlockingRepositoryPostgres } from "../infra/database/postgres/implementations/BlockingRepository";
import { CreateBlockingService } from "../services/Blocking/CreateBlocking";
import { FindBlockingService } from "../services/Blocking/FindBlocking";

const createBlockingService = new CreateBlockingService(
	new BlockingRepositoryPostgres()
);

const findBlockingService = new FindBlockingService(
	new BlockingRepositoryPostgres()
);

// const patchEspedientService = new PatchEspedientService(
// 	new EspedientRepositoryPostgres()
// );

class BlockingController implements IBlockingController {
	async create(req: Request, res: Response): Promise<Response> {
		const {
			DateTimeStart,
			DateTimeEnd,
			description,
			allDay,
			allProfessionals,
			professional,
			businessId,
		} = req.body;

		try {
			const result = await createBlockingService.execute({
				DateTimeStart,
				DateTimeEnd,
				description,
				allDay,
				allProfessionals,
				professional,
				businessId,
			});

			if (result instanceof Error) return res.status(404).json(result.message);
			return res.status(200).json(result);
		} catch (err) {
			console.log(err.message);
			return res.status(500).json("Unexpected error");
		}
	}

	async find(req: Request, res: Response): Promise<Response> {
		// const { businessId } = req.params;
		try {
			const result = await findBlockingService.execute();

			if (result instanceof Error) return res.status(404).json(result.message);
			
			return res.status(200).json(result);
		} catch (err) {
			console.log(err.message);
			return res.status(500).json("Unexpected error");
		}
	}


	// async patch(req: Request, res: Response): Promise<Response> {
	// 	const { name, description, expediencysInfos } = req.body;
	// 	const { espedientId } = req.params;
	// 	const { id: userId } = req.userReq;
	// 	try {
	// 		const result = await patchEspedientService.execute({
	// 			userId,
	// 			name,
	// 			description,
	// 			expediencysInfos,
	// 			espedientId,
	// 		});
	// 		if(result instanceof CustomError) return res.status(result.statusCode).json(result.message);
	// 		return res.status(200).json(result);
	// 	} catch (err) {
	// 		console.log(err.message);
	// 		return res.status(500).json("Unexpected error");
	// 	}
	// }
}

export default new BlockingController();
