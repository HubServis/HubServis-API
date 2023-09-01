import { Business } from "../../entities/Business";
import { IBusinessRepository, IFindOneBusiness } from "../../repositories/BusinessRepository";

export class FindOneBusinessService {
  constructor(private BusinessRepository: IBusinessRepository) {}

  public async execute(props: IFindOneBusiness): Promise<Business | Error> {
    const user = await this.BusinessRepository.findOne(props);
    return user;
  }
}
