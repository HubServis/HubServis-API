import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Limit } from "../database/postgres/models/Limit";

export default class LimitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const limitRepo = dataSource.getRepository(Limit);

    const limitData: Omit<Limit, "id" | "created_at"> = {
      name: "Não pode fazer A",
      description: "não pode fazer A",
      value: 0,
      isControllable: true,
      role: "nada",
    };

    const newLimit = limitRepo.create(limitData);

    await limitRepo.save(newLimit);
  }
}
