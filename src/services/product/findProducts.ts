import { Product } from "../../entities/Product";
import { IProductsRepository } from "../../repositories/ProductsRepository";

export class FindProductService{
    constructor(
        private productsRepository: IProductsRepository
    ){}

    public async execute():Promise<Product[]>{
        const users = await this.productsRepository.find();
        return users;
    }
}