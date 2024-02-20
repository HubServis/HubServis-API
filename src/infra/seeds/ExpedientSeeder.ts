import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import Expedient from "../database/postgres/models/Espedient";
// import Business from "../database/postgres/models/Business";
// import { Professional } from "../database/postgres/models/Professional";

export default class ExpedientSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const expedientRepo = dataSource.getRepository(Expedient);
    // const businessRepo = dataSource.getRepository(Business);
    // const professionals = dataSource.getRepository(Professional);

    const expedientData: Omit<
      Expedient,
      "id" | "created_at" | "business" | "professionals"
    > = {
      name: "Novo expediente",
      description: "Teste de expedient",
      expediencysInfos: "Não sei o que colocar aqui :/",
    };

    const newExpedient = expedientRepo.create(expedientData);

    await expedientRepo.save(newExpedient);
  }
}
