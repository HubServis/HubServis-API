import { DataSource } from "typeorm";
import { Seeder, SeederFactory, SeederFactoryManager } from "typeorm-extension";
import Blocking from "../database/postgres/models/Blocking";
// import Business from "../database/postgres/models/Business";
// import { Professional } from "../database/postgres/models/Professional";

export default class BlockingSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const blockingRepo = dataSource.getRepository(Blocking);
    // const businessRepo = dataSource.getRepository(Business);
    // const professionalRepo = dataSource.getRepository(Professional);

    const blockingData: Omit<
      Blocking,
      "id" | "business" | "professional" | "created_at"
    > = {
      dateTimeStart: "20-02-2024-ISO",
      dateTimeEnd: "22-02-2024-ISO",
      description: "blocking day one",
      allDay: false,
      allProfessionals: true,
    };

    const newBlocking = blockingRepo.create(blockingData);

    await blockingRepo.save(newBlocking);
  }
}
