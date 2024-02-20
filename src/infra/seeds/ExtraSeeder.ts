import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Extra } from "../database/postgres/models/Extra";
import { User } from "../database/postgres/models/User";

export default class ExtraSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepo = dataSource.getRepository(User);
    const extraRepo = dataSource.getRepository(Extra);

    const user = await userRepo.findOne({ where: { name: "Ramilthon BMW 2" } });

    const extraData: Omit<Extra, "id" | "created_at"> = {
      name: "new extra",
      description: "test",
      value: 0,
      isControllable: true,
      role: "nada",
      user: user,
    };

    const newExtra = extraRepo.create(extraData);

    await extraRepo.save(newExtra);
  }
}
