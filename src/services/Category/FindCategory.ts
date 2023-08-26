import { ICategoryRepository, ICreateCategory } from "../../repositories/CategoryRepository";

export class FindCategoryService {
  constructor(private categoriesRepository: ICategoryRepository) {}

  public async execute() {
    const category = await this.categoriesRepository.find();
    return category;
  }
}
