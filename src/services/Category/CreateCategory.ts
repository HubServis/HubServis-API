import { ICategoryRepository, ICreateCategory } from "../../repositories/CategoryRepository";

export class CreateCategoryService {
  constructor(private categoriesRepository: ICategoryRepository) {}

  public async execute(props: ICreateCategory) {
    const category = await this.categoriesRepository.create(props);
    return category;
  }
}
