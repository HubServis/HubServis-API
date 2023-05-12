import { Service } from "../../entities/Service";
import { IServiceRepository } from "../../repositories/ServicesRepository";

export class CreateRerviceService{
    constructor(
        private servicesRepository: IServiceRepository
    ){}

    public async execute(props: Service){
        const service = await this.servicesRepository.create(props);
        return service;
    }
}