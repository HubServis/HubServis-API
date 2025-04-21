import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Plan } from "../../database/postgres/models/Plan";
// import { Benefit } from "../database/postgres/models/Benefit";
// import { Limit } from "../database/postgres/models/Limit";

export default class PlansSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    const planRepo = dataSource.getRepository(Plan);
    // const limitsRepo = dataSource.getRepository(Limit);
    // const benefitsRepo = dataSource.getRepository(Benefit);

    // const limits = limitsRepo.find();
    // const benefits = benefitsRepo.find();

    const planData: Omit<Plan, "id" | "benefits" | "limits" | "created_at"> = {
      name: "bronze",
      isPrivated: false,
      description: "Some Desck here",
      price: 0,
      // benefits: benefits,
      // limits: limits,
    };

    const newPlan = planRepo.create(planData);

    await planRepo.save(newPlan);
  }
}
