import { Response, Request } from "express";

import { IBusinessController } from "../interfaces/controllers";
import { CreateBusinessService } from "../services/business/CreateBusiness";
import { FindBusinessService } from "../services/business/FindBusiness";
import { Business } from "../entities/Business";
import { BusinessRepositoryPostgres } from "../infra/database/postgres/implementations/BusinessRepository";
import { FindOneBusinessService } from "../services/business/FindOneBusiness";
import { DeleteBusinessService } from "../services/business/DeleteBusiness";
import { PatchBusinessService } from "../services/business/PatchBusiness";
import { decriptCookie } from "../middleware/cookie";

const createBusinessService = new CreateBusinessService(
	new BusinessRepositoryPostgres()
);
const findBusinessService = new FindBusinessService(
	new BusinessRepositoryPostgres()
);

const findOneBusinessService = new FindOneBusinessService(
	new BusinessRepositoryPostgres()
);

const deleteBusinessService = new DeleteBusinessService(
	new BusinessRepositoryPostgres()
);

const patchBusinessService = new PatchBusinessService(
	new BusinessRepositoryPostgres()
);

class BusinessController implements IBusinessController {
	async create(req: Request, res: Response) {
		const { name } = req.body;
		const cookieDescripted: any = decriptCookie(req, res);
    
		try {
			const business = new Business({ name });
			const result = await createBusinessService.execute(
				business,
				cookieDescripted.userId
			);

			if (result instanceof Error) {
				return res.status(400).json(result.message);
			}

			return res.status(201).json({ res: result });
		} catch (err) {
			console.log(err.message);
			return res.status(500).json("Unexpected error");
		}
	}

	async find(req: Request, res: Response) {
		try {
			const products = await findBusinessService.execute();
			return res.status(201).json(products);
		} catch (err) {
			console.log(err.message);
			return res.status(500).json("Unexpected error");
		}
	}

	async findOne(req: Request, res: Response) {
		const { id: businessId } = req.params;

		try {
			const result = await findOneBusinessService.execute({
				businessId,
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

	async delete(req: Request, res: Response) {
		const { businessId } = req.params;
		const { id } = req.userReq;

		try {
			const result = await deleteBusinessService.execute({
				businessId,
				userId: id,
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

	async patch(req: Request, res: Response) {
		const { id } = req.userReq;
		const { name, id: businessId } = req.body;

		try {
			const result = await patchBusinessService.execute({
				userId: id,
				newBusiness: {
					id: businessId,
					name,
				},
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

export default new BusinessController();
