import { Plan } from "../../entities/Plan";

import { IPlanRepository } from "../../repositories/PlansRepository";

export class CreatePlanService {
  constructor(private plansRepository: IPlanRepository) {}

  public async execute(props: Plan) {
    const benefit = await this.plansRepository.create(props);

    return benefit;
  }
}
