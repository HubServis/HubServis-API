import { DataSource } from "typeorm";
import { Seeder, } from "typeorm-extension";
import { User } from "../../database/postgres/models/User";
import Business from "../../database/postgres/models/Business";
// import Service from "../database/postgres/models/Service";
// import Blocking from "../database/postgres/models/Blocking";
// import Category from "../database/postgres/models/Category";
// import Expedient from "../database/postgres/models/Espedient";
// import Appointment from "../database/postgres/models/Appointment";
// import { Professional } from "../database/postgres/models/Professional";

export default class BusinessSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    const userRepo = dataSource.getRepository(User);
    const businessRepo = dataSource.getRepository(Business);
    // const serviceRepo = dataSource.getRepository(Service);
    // const blockingsRepo = dataSource.getRepository(Blocking);
    // const categoriesRepo = dataSource.getRepository(Category);
    // const expediencysRepo = dataSource.getRepository(Expedient);
    // const appointmentsRepo = dataSource.getRepository(Appointment);
    // const professionalRepo = dataSource.getRepository(Professional);

    // const services = await serviceRepo.find();
    // const blockings = await blockingsRepo.find();
    // const categories = await categoriesRepo.find();
    // const expediencys = await expediencysRepo.find();
    // const appointments = await appointmentsRepo.find();
    // const professionals = await professionalRepo.find();
    const user = await userRepo.findOne({ where: { name: "Ramilthon BMW 2" } });

    const businessData: Omit<
      Business,
      | "id"
      | "appointments"
      | "categories"
      | "expediencys"
      | "professionals"
      | "services"
      | "blockings"
      | "created_at"
    > = {
      name: "HubServis",
      user: user,
      // services: services,
      // blockings: blockings,
      // categories: categories,
      // expediencys: expediencys,
      // appointments: appointments,
      // professionals: professionals,
    };

    const newBusiness = businessRepo.create(businessData);

    await businessRepo.save(newBusiness);
  }
}
