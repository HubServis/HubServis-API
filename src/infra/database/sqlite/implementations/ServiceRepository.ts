import { Service } from "../../../../entities/Service";
import { Service as ServiceSchema } from "../models/Service";
import { User as UserSchema } from "../models/User";
import Database from "../config";
import { IServicesRepository } from "../../../../repositories/ServicesRepository";

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

  public async find(): Promise<Error | Service[]> {
    const serviceRepository = (await Database).getRepository(ServiceSchema);

    const service = await serviceRepository.find({
      relations: ["business", "categories"],
    });

    return service;
  }
}
