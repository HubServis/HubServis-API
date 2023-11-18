import {
	IBlockingRepository,
	ICreateBlocking,
} from "../../../../repositories/BlockingRepository";
import { Blocking as BlockingSchema } from "../models/Blocking";
import { Professional as ProfessionalSchema } from "../models/Professional";
import { Business as BusinessSchema } from "../models/Business";
import { Blocking } from "../../../../entities/Blocking";
import Database from "../config";
import { In } from "typeorm";

export class BlockingRepositorySqlite implements IBlockingRepository {
	public async create(props: ICreateBlocking): Promise<string | Error> {
		const {
			DateTimeStart,
			DateTimeEnd,
			description,
			allDay,
			allProfessionals,
			professional,
			businessId,
		} = props;

		const blockingRepository = (await Database).getRepository(BlockingSchema);
		const businessRepository = (await Database).getRepository(BusinessSchema);

		const findBusiness = await businessRepository.findOne({
			where: {
				id: businessId,
			},
		});

		if (!allProfessionals) {
			const professionalRepository = (await Database).getRepository(
				ProfessionalSchema
			);

			const findProfessional: ProfessionalSchema | any =
				await professionalRepository.find({
					relations: {
						business: true,
					},
					where: {
						id: professional,
						business: {
							id: businessId,
						},
					},
				});

			if (!findProfessional) return new Error("Professional not found!");

			await blockingRepository.save({
				...new Blocking({
					DateTimeStart,
					DateTimeEnd,
					description,
					allDay,
					allProfessionals,
				}),
				business: findBusiness,
				professional: findProfessional,
			});

			return "Blocking created!";
		}

		await blockingRepository.save({
			...new Blocking({
				DateTimeStart,
				DateTimeEnd,
				description,
				allDay,
				allProfessionals,
			}),
			business: findBusiness,
		});

		return "Blocking Created!";
	}
}
