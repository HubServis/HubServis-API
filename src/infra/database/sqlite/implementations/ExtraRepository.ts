import { Extra } from "../../../../entities/Extra";
import { IExtraCreate, IExtraRepository } from "../../../../repositories/ExtraRepository";
import { Extra as ExtraSchema } from "../models/Extra";
import { User as UserSchema } from "../models/User";
import Database from "../config";

export class ExtraRepositorySqlite implements IExtraRepository {
	public async create(props: IExtraCreate): Promise<string | Extra | Error> {
		const {
			newExtra: { name, description, value, isControllable, role },
			userId
		} = props;

		const extraRepository = (await Database).getRepository(ExtraSchema);

		const alreadyCreated = await extraRepository.findOne({
			where: [{ name: name }, { role: role }],
		});

		if (alreadyCreated) return new Error("This Extra Already Exists");
		
		const userRepository = (await Database).getRepository(UserSchema);
		const user = await userRepository.findOneBy({
			id: userId
		});
		
		if (!user) return new Error("This user don't Exists");

		const newExtra = new Extra({
			name,
			description,
			isControllable,
			role,
			value,
		});

		const extra = await extraRepository.save({
			...newExtra,
			user
		});

		return extra;
	}
}
