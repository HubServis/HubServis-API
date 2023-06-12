import { Business } from "../../entities/Business";
import { IBusinessRepository } from "../../repositories/BusinessRepository";

export class FindBusinessService {
  constructor(private BusinessRepository: IBusinessRepository) {}

  public async execute(): Promise<Business[]> {
    const users = await this.BusinessRepository.find();
    return users;
  }
}
