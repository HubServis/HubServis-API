import { ILimitRepository, ILimitUpdate } from "../../repositories/LimitRepository";

export class PatchLimitService {
  constructor(private limitsRepository: ILimitRepository) {}

  public async execute(props: ILimitUpdate) {
    const limit = await this.limitsRepository.patch(props);

    return limit;
  }
}
