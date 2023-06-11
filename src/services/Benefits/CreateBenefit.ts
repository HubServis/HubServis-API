import { Benefit } from "../../entities/Benefits";

import { IBenefitRepository } from "../../repositories/BenefitsRepository";

export class CreateBenefitService {
  constructor(private benefitsRepository: IBenefitRepository) {}

  public async execute(props: Benefit) {
    const benefit = await this.benefitsRepository.create(props);

    return benefit;
  }
}
