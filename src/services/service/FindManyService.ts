import { Service } from "../../entities/Service";
import { IFindManyServices, IServicesRepository } from "../../repositories/ServicesRepository";

export class FindManyServicesService {
  constructor(private servicesRepository: IServicesRepository) {}

  public async execute(props: IFindManyServices): Promise<Error | Service[]> {
    const services = await this.servicesRepository.findMany(props);
    return services;
  }
}
