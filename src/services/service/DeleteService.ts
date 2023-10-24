import { IDeleteService, IServicesRepository } from "../../repositories/ServicesRepository";

export class DeleteServiceService {
  constructor(private servicesRepository: IServicesRepository) {}

  public async execute(props: IDeleteService): Promise<Error | string> {
    const service = await this.servicesRepository.delete(props);
    return service;
  }
}
