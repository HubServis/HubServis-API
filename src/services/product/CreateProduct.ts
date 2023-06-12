import { Product } from "../../entities/Product";
import { IProductsRepository } from "../../repositories/ProductsRepository";

export class CreateProductService {
  constructor(private productsRepository: IProductsRepository) {}

  // Pode fazer assim também
  // private usersRepository: IUsersRepository;
  // constructor(usersRepository: IUsersRepository){
  //     this.usersRepository = usersRepository;
  // }

  public async execute(props: Product) {
    const user = await this.productsRepository.create(props);
    return user;
  }
}
