import {
  IAddLimitsToPlan,
  IPlanRepository,
} from "../../repositories/PlansRepository";

export class AppendPlanLimitService {
  constructor(private plansRepository: IPlanRepository) {}

  public async execute(props: IAddLimitsToPlan) {
    const limit = await this.plansRepository.appendLimit(props);

    return limit;
  }
}
