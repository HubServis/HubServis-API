import { Limit } from "../../entities/Limit";

import { ILimitRepository } from "../../repositories/LimitRepository";

export class CreateLimitService {
  constructor(private limitsRepository: ILimitRepository) {}

  public async execute(props: Limit) {
    const limit = await this.limitsRepository.create(props);

    return limit;
  }
}
