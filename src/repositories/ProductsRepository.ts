import { Product } from "../entities/Product";

export interface IProductsRepository{
    create(props: Product):Promise<Product>;
    find(): Promise<Product[]>;
}