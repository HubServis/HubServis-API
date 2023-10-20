import { Professional } from "../../entities/Professional";
import { IProfessionalsRepository } from "../../repositories/ProfessionalsRepository";

export class FindProfessionalsService {
  constructor(private professionalsRepository: IProfessionalsRepository) {}

  public async execute() {
    const professionals = await this.professionalsRepository.findAll();
    return professionals;
  }
}
