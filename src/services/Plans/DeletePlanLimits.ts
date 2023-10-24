import {
  IPlanLimitNames,
  IPlanRepository,
} from "../../repositories/PlansRepository";

export class DeletePlanLimitService {
  constructor(private plansRepository: IPlanRepository) {}

  public async execute(props: IPlanLimitNames) {
    const limit = await this.plansRepository.deleteLimit(props);

    return limit;
  }
}
