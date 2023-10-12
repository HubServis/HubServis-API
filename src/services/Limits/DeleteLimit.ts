import { ILimitRepository } from "../../repositories/LimitRepository";

export class DeleteLimitService {
  constructor(private limitsRepository: ILimitRepository) {}

  public async execute(props: string) {
    const limit = await this.limitsRepository.delete(props);

    return limit;
  }
}
