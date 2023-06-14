// import { Product } from "../../../../entities/Product";
import { Business as BusinessSchema } from "../models/Business";
import { User as UserSchema } from "../models/User";
import Database from "../config";
import { IBusinessRepository } from "../../../../repositories/BusinessRepository";
import Business from "../models/Business";

export class BusinessRepositorySqlite implements IBusinessRepository {
  public async create(
    props: Business,
    userId: string
  ): Promise<Business | Error> {
    const { id, name } = props;

    const businessRepository = (await Database).getRepository(BusinessSchema);
    const userRepository = (await Database).getRepository(UserSchema);
    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ["business"],
    });

    if (user.business) {
      return new Error("User already contains a business!");
    }

    if (!user) {
      return new Error("User not found!");
    }

    const business = await businessRepository.save({ id, name, user });

    return business;
  }

  public async find(): Promise<Business[]> {
    const userRepository = (await Database).getRepository(BusinessSchema);
    const user = await userRepository.find({
      relations: ["user"],
      select: {
        user: {
          id: true,
          name: true,
          cpfcnpj: true,
          email: true,
          username: true,
        },
      },
    });

    return user;
  }
}
