import { IAppendCategoryService, ICategoryRepository } from "../../repositories/CategoryRepository";

export class AppendCategoryServiceService {
  constructor(private categoriesRepository: ICategoryRepository) {}

  public async execute(props: IAppendCategoryService) {
    const serviceCategory = await this.categoriesRepository.appendService(props);
    return serviceCategory;
  }
}
