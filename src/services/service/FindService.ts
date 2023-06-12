import { Service } from "../../entities/Service";
import { User } from "../../entities/User";
import { IServicesRepository } from "../../repositories/ServicesRepository";

export class FindServiceService {
  constructor(private servicesRepository: IServicesRepository) {}

  public async execute(): Promise<Service[]> {
    const services = await this.servicesRepository.find();
    return services;
  }
}
