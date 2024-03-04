import { Response, Request } from "express";
import { IProductController } from "../interfaces/controllers";
import { Product } from "../entities/Product";
import { CreateProductService } from "../services/product/CreateProduct";
import { FindProductService } from "../services/product/findProducts";
import { ProductRepositoryPostgres } from "../infra/database/postgres/implementations/ProductRepository";

const createProductService = new CreateProductService(
  new ProductRepositoryPostgres()
);
const findProductService = new FindProductService(
  new ProductRepositoryPostgres()
);

class ProductController implements IProductController {
  async create(req: Request, res: Response) {
    const { name, description, price } = req.body;

    try {
      const product = new Product({ name, description, price: Number(price) });
      const createdUser = await createProductService.execute(product);

      return res.status(201).json(createdUser);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }

  async find(req: Request, res: Response) {
    try {
      const products = await findProductService.execute();
      return res.status(201).json(products);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }
}

export default new ProductController();
