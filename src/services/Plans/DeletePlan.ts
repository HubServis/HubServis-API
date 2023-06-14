import { Plan } from "../../entities/Plan";

import { IPlanRepository } from "../../repositories/PlansRepository";

export class DeletePlanService {
  constructor(private plansRepository: IPlanRepository) {}

  public async execute(props: string) {
    const benefit = await this.plansRepository.delete(props);

    return benefit;
  }
}
