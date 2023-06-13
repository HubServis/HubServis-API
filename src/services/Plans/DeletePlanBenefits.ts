import {
  IPlanBenefitNames,
  IPlanRepository,
} from "../../repositories/PlansRepository";

export class DeletePlanBenefitService {
  constructor(private plansRepository: IPlanRepository) {}

  public async execute(props: IPlanBenefitNames) {
    const benefit = await this.plansRepository.deleteBenefit(props);

    return benefit;
  }
}
