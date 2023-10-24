import { ICategoryRepository, IListServicesCategory } from "../../repositories/CategoryRepository";

export class ListServicesCategoryService {
	constructor(private categoriesRepository: ICategoryRepository) {}

	public async execute(props: IListServicesCategory) {
		const services =
			await this.categoriesRepository.listServicesCategory(props);
		return services;
	}
}
