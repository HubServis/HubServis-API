import {
  IAddBenefitsToPlan,
  IPlanRepository,
} from "../../repositories/PlansRepository";

export class AppendPlanBenefitService {
  constructor(private plansRepository: IPlanRepository) {}

  public async execute(props: IAddBenefitsToPlan) {
    const benefit = await this.plansRepository.appendBenefit(props);

    return benefit;
  }
}
