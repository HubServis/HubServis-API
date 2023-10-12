import Database from "../config";

import { Limit as LimitSchema } from "../models/Limit";
import {
  ILimitRepository,
  ILimitUpdate,
} from "../../../../repositories/LimitRepository";
import { Limit } from "../../../../entities/Limit";

export class LimitsRepositorySqlite implements ILimitRepository {
  public async create(props: Limit): Promise<string | Limit | Error> {
    const { name, description, value, isControllable, role } = props;

    const limitRepository = (await Database).getRepository(LimitSchema);

    const alreadyCreated = await limitRepository.findOne({
      where: [{ name: name }, { role: role }],
    });

    if (alreadyCreated) return new Error("This Limit Already Exists");

    const newLimit = new Limit({
      name,
      description,
      isControllable,
      role,
      value,
    });

    const limit = await limitRepository.save(newLimit);

    return limit;
  }

  public async find(): Promise<Error | Limit[]> {
    const limitRepository = (await Database).getRepository(LimitSchema);

    const limit = await limitRepository.find({});

    return limit;
  }

  public async delete(props: string): Promise<string | Error> {
    const limitRepository = (await Database).getRepository(LimitSchema);

    const limit = await limitRepository.findOne({
      where: { id: props },
    });

    if (!limit) return new Error("This limit not Exists");

    await limitRepository.remove(limit);

    return `Limit with name '${limit.name}' and role '${limit.role}' removed!`;
  }

  public async patch(props: ILimitUpdate): Promise<string | Error> {
    const limitRepository = (await Database).getRepository(LimitSchema);

    if (!props.newLimit.id) return new Error("ID not informed!");

    const limit = await limitRepository.findOne({
      where: { id: props.newLimit.id },
    });

    if (!limit) return new Error("This limit not Exist!");

    const limitRoleExist = await limitRepository.findOne({
      where: { role: props.newLimit.role },
    });

    if (limitRoleExist)
      return new Error("There is already a limit with this role!");

    limit.name = props.newLimit.name ?? limit.name;
    limit.value = props.newLimit.value ?? limit.value;
    limit.description = props.newLimit.description ?? limit.description;
    limit.isControllable =
      props.newLimit.isControllable ?? limit.isControllable;
    limit.role = props.newLimit.role ?? limit.role;

    await limitRepository.save(limit);

    return `Limit with name ${props.newLimit.name} edited Successfuly`;
  }
}