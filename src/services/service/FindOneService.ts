import { Service } from "../../entities/Service";
import { User } from "../../entities/User";
import { IFindOneService, IServicesRepository } from "../../repositories/ServicesRepository";

export class FindOneServiceService {
  constructor(private servicesRepository: IServicesRepository) {}

  public async execute(props: IFindOneService): Promise<Error | Service> {
    const service = await this.servicesRepository.findOne(props);
    return service;
  }
}
