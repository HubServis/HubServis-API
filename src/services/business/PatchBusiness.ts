import { Business } from "../../entities/Business";
import { IBusinessRepository, IPatchBusiness } from "../../repositories/BusinessRepository";

export class PatchBusinessService {
  constructor(private BusinessRepository: IBusinessRepository) {}

  public async execute(props: IPatchBusiness): Promise<string | Error> {
    const business = await this.BusinessRepository.patch(props);
    return business;
  }
}
