import { IBenefitRepository } from "../../repositories/BenefitsRepository";

import { Benefit } from "../../entities/Benefit";

export class UpdateBenefitService {
  constructor(private benefitsRepository: IBenefitRepository) {}

  public async execute(props: { benefitName: string; newBenefit: Benefit }) {
    const benefit = await this.benefitsRepository.patch(props);

    return benefit;
  }
}
