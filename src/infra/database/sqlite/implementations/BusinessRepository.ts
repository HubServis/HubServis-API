// import { Product } from "../../../../entities/Product";
import { Business as BusinessSchema } from "../models/Business";
import { User as UserSchema } from "../models/User";
import Database from "../config";
import { IBusinessRepository, IDeleteBusiness, IFindOneBusiness } from "../../../../repositories/BusinessRepository";
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
    const businessRepository = (await Database).getRepository(BusinessSchema);
    const business = await businessRepository.find({
      relations: ["user", "professionals"],
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

    return business;
  }

  public async findOne(props: IFindOneBusiness): Promise<Business | Error> {
    const businessRepository = (await Database).getRepository(BusinessSchema);
    const business = await businessRepository.findOne({
      where: {
        id: props.businessId
      },
      relations: ["user", "professionals"],
      select: {
        user: {
          id: true,
          name: true,
          cpfcnpj: false,
          email: true,
          username: true,
        },
        professionals: {
          id: true,
          name: true,
          created_at: true,
        }
      },
    });

    if(!business){
      return new Error("Business not found!");
    }

    return business;
  }

  public async delete(props: IDeleteBusiness): Promise<string | Error> {
    const { businessId, userId } = props;
    const businessRepository = (await Database).getRepository(BusinessSchema);
    const business = await businessRepository.findOne({
      where: {
        id: businessId
      }
    });

    if (!business) return new Error("This Business not Exists");

    await businessRepository.remove(business);

    return `Business with name ${business.name} removed!`;
  }
}
