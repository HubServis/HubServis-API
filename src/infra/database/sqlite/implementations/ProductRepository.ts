import { Product } from "../../../../entities/Product";
import { Product as ProductSchema } from '../models/Product';
import { IProductsRepository } from "../../../../repositories/ProductsRepository";
import Database from '../config';

export class ProductRepositorySqlite implements IProductsRepository{
    public async create(props: Product): Promise<Product> {
        const {id, name, description, price} = props;

        const productRepository = (await Database).getRepository(ProductSchema);
        const user = await productRepository.save({id, name, description, price});

        return user;
    }


    public async find(): Promise<Product[]>{
        const userRepository = (await Database).getRepository(ProductSchema);
        const user = await userRepository.find();

        return user;
    }
}