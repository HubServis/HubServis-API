import { IBenefitRepository } from "../../repositories/BenefitsRepository";

export class DeleteBenefitService {
  constructor(private benefitsRepository: IBenefitRepository) {}

  public async execute(props: string) {
    const benefit = await this.benefitsRepository.delete(props);

    return benefit;
  }
}
