import { log } from "console";
import { Expedient as EspedientSchema } from "../models/Espedient";
import { Espedient } from "../../../../entities/Espedient";
import {
	ICreateExpedient,
	IExpediencysRepository,
} from "../../../../repositories/EspedientRepository";
import Database from "../config";
import { User as UserSchema } from "../models/User";

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

	public async find(): Promise<Espedient[] | Error> {
		const espedientRepository = (await Database)
			.getRepository(EspedientSchema)
			.extend({
				async parserBase64(): Promise<null | Espedient[]> {
					const expediencys = await this.find({});
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

		if (!expediencys) return new Error("Expediencys not found!");

		return expediencys;
	}
}
