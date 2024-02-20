import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import Product from "../database/postgres/models/Product";

export default class ProductSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const productRepo = dataSource.getRepository(Product);

    const productData: Omit<Product, "id" | "created_at"> = {
      name: "Esse produto é um teste",
      description: "Teste de produot",
      price: 0,
    };

    const newProduct = productRepo.create(productData);

    await productRepo.save(newProduct);
  }
}
