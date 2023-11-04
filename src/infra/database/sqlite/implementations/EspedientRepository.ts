import { log } from "console";
import { Expedient as EspedientSchema } from "../models/Espedient";
import { Espedient } from "../../../../entities/Espedient";
import {
	ICreateExpedient,
	IExpediencysRepository,
	IUpdateEspedient,
} from "../../../../repositories/EspedientRepository";
import Database from "../config";
import { User as UserSchema } from "../models/User";
import { CustomError } from "../../../../interfaces/errors";

export class EspedientRepositorySqlite implements IExpediencysRepository {
	public async create(props: ICreateExpedient): Promise<Error | string> {
		const { name, description, expediencysInfos, userId } = props;

		const expediencysInfosBase64 = Buffer.from(
			JSON.stringify(expediencysInfos)
		).toString("base64");

		const userRepository = (await Database).getRepository(UserSchema);
		const user = await userRepository.findOne({
			where: {
				id: userId,
			},
			relations: {
				business: true,
			},
		});

		if (!user) return new Error("User not exists!");

		const espedientRepository = (await Database).getRepository(EspedientSchema);
		const newEspedient = new Espedient({
			name,
			description,
			expediencysInfos: expediencysInfosBase64,
		});

		await espedientRepository.save({
			...newEspedient,
			business: user.business,
		});

		return "Espedient created!";
	}

	public async find(props: string): Promise<Espedient[] | Error> {
		if (!props || props == "") return new Error("Business Id not informed!");

		const espedientRepository = (await Database)
			.getRepository(EspedientSchema)
			.extend({
				async parserBase64(): Promise<null | Espedient[]> {
					const expediencys = await this.find({
						relations: {
							business: true,
						},
						where: {
							business: {
								id: props,
							},
						},
					});
					return expediencys.map((espedient) => {
						return {
							...espedient,
							expediencysInfos: JSON.parse(
								Buffer.from(espedient?.expediencysInfos, "base64").toString(
									"utf-8"
								)
							),
						};
					});
				},
			});

		const expediencys = await espedientRepository.parserBase64();

		if (!expediencys || expediencys.length == 0)
			return new Error("Expediencys not found!");

		return expediencys;
	}

	public async patch(
		props: IUpdateEspedient
	): Promise<Error | Espedient | CustomError | string> {
		const { description, espedientId, expediencysInfos, name, userId } = props;

		

		const newExpediencysInfosBase64 = Buffer.from(
			JSON.stringify(expediencysInfos)
		).toString("base64");

		if (!espedientId || espedientId == "")
			return new CustomError({
				type: "error",
				statusCode: 400,
				message: "Espedient Id not informed!",
			});

		const espedientRepository = (await Database).getRepository(EspedientSchema);
		const espedient = await espedientRepository.findOne({
			where: { id: espedientId },
			relations: {
				business: true
			}
		});

		if (!espedient)
			return new CustomError({
				type: "error",
				statusCode: 404,
				message: "Espedient don't exists",
			});

		const userRepository = (await Database).getRepository(UserSchema);
		const user = await userRepository.findOne({
			where: {
				id: userId,
			},
			relations: {
				business: true,
			},
		});

		if (!user)
			return new CustomError({
				type: "error",
				message: "User not found!",
				statusCode: 404,
			});

		if (espedient.business?.id !== user.business?.id)
			return new CustomError({
				type: "error",
				message: "Este espediente não pertence à sua empresa.",
				statusCode: 403,
			});

		espedient.name = name ?? espedient.name;
		espedient.description = description ?? espedient.description;
		espedient.expediencysInfos = newExpediencysInfosBase64 == espedient.expediencysInfos ? espedient.expediencysInfos : newExpediencysInfosBase64;
		
		await espedientRepository.save(espedient);

		return "Espedient updated!";
	}
}
