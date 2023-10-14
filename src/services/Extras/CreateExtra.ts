import { Extra } from "../../entities/Extra";

import { IExtraRepository } from "../../repositories/ExtraRepository";

export class CreateExtraService {
  constructor(private extrasRepository: IExtraRepository) {}

  public async execute(props: Extra) {
    const extra = await this.extrasRepository.create(props);

    return extra;
  }
}
