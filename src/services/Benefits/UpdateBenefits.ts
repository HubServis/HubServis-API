import { IBenefitRepository } from "../../repositories/BenefitsRepository";

export class UpdateBenefitService {
  constructor(private benefitsRepository: IBenefitRepository) {}

  public async execute(props) {
    const benefit = await this.benefitsRepository.patch(props);

    return benefit;
  }
}
