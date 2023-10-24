import { Business } from "../../entities/Business";
import { IBusinessRepository, IDeleteBusiness, IFindOneBusiness } from "../../repositories/BusinessRepository";

export class DeleteBusinessService {
  constructor(private BusinessRepository: IBusinessRepository) {}

  public async execute(props: IDeleteBusiness): Promise<string | Error> {
    const business = await this.BusinessRepository.delete(props);
    return business;
  }
}
