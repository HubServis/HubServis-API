import {
  IPlanRepository,
  IPlanUpdate,
} from "../../repositories/PlansRepository";

export class UpdatePlanService {
  constructor(private plansRepository: IPlanRepository) {}

  public async execute(props: IPlanUpdate) {
    const benefit = await this.plansRepository.patch(props);

    return benefit;
  }
}
