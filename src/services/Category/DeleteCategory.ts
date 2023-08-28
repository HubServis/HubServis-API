import { IAppendCategoryService, ICategoryRepository, IDeleteCategory } from "../../repositories/CategoryRepository";

export class DeleteCategoryService {
  constructor(private categoriesRepository: ICategoryRepository) {}

  public async execute(props: IDeleteCategory) {
    const serviceCategory = await this.categoriesRepository.delete(props);
    return serviceCategory;
  }
}
