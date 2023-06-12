import { IBenefitRepository } from "../../repositories/BenefitsRepository";

export class FindBenefitService {
  constructor(private benefitsRepository: IBenefitRepository) {}

  public async execute(props: string) {
    const benefit = await this.benefitsRepository.find(props);

    return benefit;
  }
}
