import { Service } from "../../entities/Service";
import { IFindServiceHighlight, IServicesRepository } from "../../repositories/ServicesRepository";

export class FindServicesHighlightService {
	constructor(private servicesRepository: IServicesRepository) {}

	public async execute(props: IFindServiceHighlight) {
		const services = await this.servicesRepository.findServicesHighlight(props);
		return services;
	}
}
