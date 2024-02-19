import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Benefit } from "../database/postgres/models/Benefit";

export default class BenefitsSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const benefitsRepo = dataSource.getRepository(Benefit);

    const benefitsData: Omit<Benefit, "id" | "created_at"> = {
      name: "bronze",
      description: "Benefício base para qualquer pessoa",
      max_value: 0,
      isControllable: true,
      role: "nada",
    };

    const newBenefit = benefitsRepo.create(benefitsData);

    await benefitsRepo.save(newBenefit);
  }
}
