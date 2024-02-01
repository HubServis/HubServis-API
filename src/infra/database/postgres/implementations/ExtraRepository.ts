import { Extra } from "../../../../entities/Extra";
import {
	IExtraCreate,
	IExtraRepository,
	IExtraUpdate,
} from "../../../../repositories/ExtraRepository";
import { Extra as ExtraSchema } from "../models/Extra";
import { User as UserSchema } from "../models/User";
import Database from "../config";

export class ExtraRepositoryPostgres implements IExtraRepository {
	public async create(props: IExtraCreate): Promise<string | Extra | Error> {
		const {
			newExtra: { name, description, value, isControllable, role },
			userId,
		} = props;

		const extraRepository = (await Database).getRepository(ExtraSchema);

		const alreadyCreated = await extraRepository.findOne({
			where: [{ name: name }, { role: role }],
		});

		if (alreadyCreated) return new Error("This Extra Already Exists");

		const userRepository = (await Database).getRepository(UserSchema);
		const user = await userRepository.findOneBy({
			id: userId,
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
			user,
		});

		return extra;
	}

	public async find(): Promise<Error | Extra[]> {
		const extraRepository = (await Database).getRepository(ExtraSchema);

		const extra = await extraRepository.find({});

		return extra;
	}

	public async delete(props: string): Promise<string | Error> {
		const extraRepository = (await Database).getRepository(ExtraSchema);

		const extra = await extraRepository.findOne({
			where: { id: props },
		});

		if (!extra) return new Error("This extra not exists");

		await extraRepository.remove(extra);

		return `Extra with name '${extra.name}' and role '${extra.role}' removed!`;
	}

	public async patch(props: IExtraUpdate): Promise<string | Error> {
		const {
			newExtra: { id, description, isControllable, name, role, value },
		} = props;
		const extraRepository = (await Database).getRepository(ExtraSchema);

		if (!id) return new Error("ID not informed!");

		const extra = await extraRepository.findOne({
			where: { id: id },
		});

		if (!extra) return new Error("This extra not Exist!");

		if (role) {
			const extraRoleExist = await extraRepository.findOne({
				where: { role: role },
			});

			if (extraRoleExist)
				return new Error("There is already a extra with this role!");
		}

		extra.name = name ?? extra.name;
		extra.value = value ?? extra.value;
		extra.description = description ?? extra.description;
		extra.isControllable = isControllable ?? extra.isControllable;
		extra.role = role ?? extra.role;

		await extraRepository.save(extra);

		return `extra with name ${name} edited Successfuly`;
	}
}
