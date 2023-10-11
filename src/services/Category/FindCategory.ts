import { ICategoryRepository, ICreateCategory, IFindCategory } from "../../repositories/CategoryRepository";

export class FindCategoryService {
  constructor(private categoriesRepository: ICategoryRepository) {}

  public async execute(props: IFindCategory) {
    const category = await this.categoriesRepository.find(props);
    return category;
  }
}
