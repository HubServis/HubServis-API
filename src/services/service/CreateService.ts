import { Service } from "../../entities/Service";
import { IServicesRepository } from "../../repositories/ServicesRepository";

export class CreateServiceService{
    constructor(
        private servicesRepository: IServicesRepository
    ){}

    public async execute(props: Service, userId: string){
        const service = await this.servicesRepository.create(props, userId);
        return service;
    }
}