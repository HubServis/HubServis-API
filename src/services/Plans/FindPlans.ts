import { Plan } from "../../entities/Plan";

import { IPlanRepository } from "../../repositories/PlansRepository";

export class FindPlanService {
  constructor(private plansRepository: IPlanRepository) {}

  public async execute(props: string) {
    const benefit = await this.plansRepository.find(props);

    return benefit;
  }
}
