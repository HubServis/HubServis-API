import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../database/postgres/models/User";
import Business from "../database/postgres/models/Business";
import Category from "../database/postgres/models/Category";
// import Service from "../database/postgres/models/Service";

export default class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepo = dataSource.getRepository(User);
    const businessRepo = dataSource.getRepository(Business);
    const categoryRepo = dataSource.getRepository(Category);
    // const serviceRepo = dataSource.getRepository(Service);

    // const services = await serviceRepo.find();
    const user = await userRepo.findOne({ where: { name: "Ramilthon BMW 2" } });
    const business = await businessRepo.findOne({ where: { name: "HubServis" } });

    const categoryData: Omit<Category, 'services' | 'id' | 'created_at'> = {
      name: "Nova Categoria",
      nameId: "nova_categoria",
      description: "Alguma coisa aqui por hora :)",
      isPrivated: true,
      owner: user,
      business: business,
      // service: services
    };

    const newCategory = categoryRepo.create(categoryData);

    await categoryRepo.save(newCategory);
  }
}
