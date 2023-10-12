import { ILimitRepository } from "../../repositories/LimitRepository";

export class FindLimitService {
  constructor(private limitsRepository: ILimitRepository) {}

  public async execute() {
    const limits = await this.limitsRepository.find();

    return limits;
  }
}
