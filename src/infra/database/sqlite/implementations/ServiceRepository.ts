import { Service } from "../../../../entities/Service";
import { Service as ServiceSchema } from "../models/Service";
import { User as UserSchema } from "../models/User";
import Database from "../config";
import {
	IDeleteService,
	IFindManyServices,
	IFindOneService,
	IFindServiceHighlight,
	IFindServices,
	IServicesRepository,
} from "../../../../repositories/ServicesRepository";
import { In, MoreThan, ServerOpeningEvent } from "typeorm";

export class ServiceRepositorySqlite implements IServicesRepository {
	public async create(
		props: Service,
		userId: string
	): Promise<Error | Service> {
		const { id, name, duration, price, description } = props;

		const serviceRepository = (await Database).getRepository(ServiceSchema);
		const userRepository = (await Database).getRepository(UserSchema);

		const user = await userRepository.findOne({
			where: {
				id: userId,
			},
			relations: ["business"],
		});

		if (!user) {
			return new Error("User not found!");
		}

		if (!user.business) {
			return new Error("The user does not have a business!");
		}

		const service = await serviceRepository.save({
			id,
			name,
			duration,
			price,
			description,
			business: user.business,
		});

		return service;
	}

	public async find(props: IFindServices): Promise<Error | Service[]> {
		const { limit } = props;

		if (limit != null || limit) {
			const serviceRepository = (await Database).getRepository(ServiceSchema);
			const service = await serviceRepository.find({
				where: {
					isPrivated: false,
				},
				order: {
					averageRating: "DESC",
				},
				take: limit,
				relations: ["business", "categories"],
			});

			return service;
		}

		const serviceRepository = (await Database).getRepository(ServiceSchema);

		const service = await serviceRepository.find({
			relations: ["business", "categories"],
		});

		return service;
	}

	public async findOne(props: IFindOneService): Promise<Error | Service> {
		const { serviceId } = props;
		const serviceRepository = (await Database).getRepository(ServiceSchema);

		const service = await serviceRepository.findOne({
			where: {
				id: serviceId,
			},
			relations: ["business", "categories"],
		});

		if (!service) return new Error("Service not found!");

		return service;
	}

	public async delete(props: IDeleteService): Promise<Error | string> {
		const { serviceId } = props;
		const serviceRepository = (await Database).getRepository(ServiceSchema);

		const service = await serviceRepository.find({
			where: {
				id: serviceId,
			},
		});

		if (!service) return new Error("Service not found!");

		await serviceRepository.remove(service);

		return "Remove service with name Sla!";
	}

	public async findServicesHighlight(
		props: IFindServiceHighlight
	): Promise<Service[] | Error> {
		const { averageRating, limit } = props;

		const serviceRepository = (await Database).getRepository(ServiceSchema);
		const services = await serviceRepository.find({
			where: {
				averageRating: MoreThan(
					averageRating != 0 && averageRating != null ? averageRating : 4
				),
			},
			relations: {
				business: true,
			},
			order: {
				averageRating: "DESC",
			},
			take: limit ?? 8,
		});

		return services;
	}

	public async findMany(props: IFindManyServices): Promise<Error | Service[]> {
		const { servicesId } = props;
		const serviceRepository = (await Database).getRepository(ServiceSchema);

		const services = await serviceRepository.find({
			where: {
				id: In(servicesId),
			},
			relations: ["business", "categories"],
		});

		if (!services || services.length == 0) return new Error("Services not found!");

		return services;
	}
}
