import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import Appointment from "../database/postgres/models/Appointment";
import Business from "../database/postgres/models/Business";
import Category from "../database/postgres/models/Category";
import Rating from "../database/postgres/models/Rating";
import { Service } from "../database/postgres/models/Service";

export default class ServiceSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const ratingsRepo = dataSource.getRepository(Rating);
    const serviceRepo = dataSource.getRepository(Service);
    const businessRepo = dataSource.getRepository(Business);
    const categoriesRepo = dataSource.getRepository(Category);
    const appointmentsRepo = dataSource.getRepository(Appointment);

    const ratings = await ratingsRepo.find();
    const categories = await categoriesRepo.find();
    const appointments = await appointmentsRepo.find();
    const business = await businessRepo.findOne({
      where: { name: "HubServis" },
    });

    const serviceData: Omit<Service, "id" | "created_at"> = {
      name: "teste",
      price: "0",
      duration: "nao sei",
      description: "service de teste",
      isPrivated: false,
      averageRating: 1,
      totalRatings: 1,
      totalValueRating: 1,
      appointments: appointments,
      business: business,
      categories: categories,
      ratings: ratings,
    };

    const newService = serviceRepo.create(serviceData);

    await serviceRepo.save(newService);
  }
}
