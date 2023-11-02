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
	public async create(
		props: ICreateExpedient
	): Promise<Error | string> {
		const { name, description, expediencysInfos, userId } = props;

		const expediencysInfosBase64 = Buffer.from(
			JSON.stringify(expediencysInfos)
		).toString("base64");

		// log(
		// 	"decodificado => ",
		// 	JSON.parse(
		// 		Buffer.from(expediencysInfosBase64, "base64").toString("utf-8")
		// 	)
		// );
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

	public async find(): Promise<Espedient | Error> {
		return new Error("Encontrei!");
	}
}
