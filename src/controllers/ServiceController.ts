import { Response, Request } from "express";
import { CreateServiceService } from "../services/service/CreateService";
import { FindServiceService } from "../services/service/FindService";
import { IServiceCotroller } from "../interfaces/controllers";
import { Service } from "../entities/Service";
import { ServiceRepositoryPostgres } from "../infra/database/postgres/implementations/ServiceRepository";
import { FindOneServiceService } from "../services/service/FindOneService";
import { DeleteServiceService } from "../services/service/DeleteService";
import { FindServicesHighlightService } from "../services/service/FindServicesHighlightService";
import { FindManyServicesService } from "../services/service/FindManyService";

const createServiceService = new CreateServiceService(
  new ServiceRepositoryPostgres()
);

const findServiceService = new FindServiceService(
  new ServiceRepositoryPostgres()
);

const findOneServiceService = new FindOneServiceService(
  new ServiceRepositoryPostgres()
);

const deleteServiceService = new DeleteServiceService(
  new ServiceRepositoryPostgres()
)

const findServicesHighlightService = new FindServicesHighlightService(
  new ServiceRepositoryPostgres()
);

const findManyServicesService = new FindManyServicesService(
  new ServiceRepositoryPostgres()
)

class ServiceController implements IServiceCotroller {
	async create(req: Request, res: Response) {
		const { name, price, duration, description } = req.body;

		try {
			const service = new Service({ name, price, duration, description });
			const result = await createServiceService.execute(
				service,
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
		const { limit } = req.query;

		try {
			const result = await findServiceService.execute({
				limit,
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

	async findOne(req: Request, res: Response) {
		const { serviceId } = req.params;

		try {
			const result = await findOneServiceService.execute({
				serviceId,
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
		const { serviceId } = req.params;
		try {
			const result = await deleteServiceService.execute({
				serviceId,
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

	async findServicesHighlight(req: Request, res: Response): Promise<Response> {
		const { averageRating, limit } = req.query;

		try {
			const result = await findServicesHighlightService.execute({
				averageRating,
				limit,
			});

			return res.status(200).json(result);
		} catch (err) {
			console.log(err.message);
			return res.status(500).json("Unexpected error");
		}
	}

	async findMany(req: Request, res: Response) {
		const { servicesId } = req.body;

		try {
			const result = await findManyServicesService.execute({
				servicesId,
			});

			if (result instanceof Error) {
				return res.status(404).json(result.message);
			}

			return res.status(200).json(result);
		} catch (err) {
			console.log(err.message);
			return res.status(500).json("Unexpected error");
		}
	}
}

export default new ServiceController();
