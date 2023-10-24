import { Service } from "../../entities/Service";
import { User } from "../../entities/User";
import { IFindServices, IServicesRepository } from "../../repositories/ServicesRepository";

export class FindServiceService {
	constructor(private servicesRepository: IServicesRepository) {}

	public async execute(props: IFindServices): Promise<Error | Service[]> {
		const services = await this.servicesRepository.find(props);
		return services;
	}
}
