import { Response, Request } from 'express';
import { IProductCotroller } from '../interfaces/controllers';
import { Product } from "../entities/Product";
import { CreateProductService } from '../services/product/CreateProduct';
import { FindProductService } from '../services/product/findProducts';
import { ProductRepositorySqlite } from '../infra/database/sqlite/implementations/ProductRepository';

const createProductService = new CreateProductService(new ProductRepositorySqlite());
const findProductService = new FindProductService(new ProductRepositorySqlite());

class ProductController implements IProductCotroller{
    
    async create(req: Request, res: Response){
        const { name, description, price } = req.body;

        try {
            const product = new Product({name, description, price: Number(price)});
            const createdUser = await createProductService.execute(product);
    
            return res.status(201).json(createdUser);
    
        } catch (err) {
            console.log(err.message);
            return res.status(500).json('Unexpected error');
        }
    }
    async find(req: Request, res: Response){
        
        try {
            const products = await findProductService.execute();
            return res.status(201).json(products);
    
        } catch (err) {
            console.log(err.message);
            return res.status(500).json('Unexpected error');
        }
    }
}

export default new ProductController();