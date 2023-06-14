import { Professional } from "../../entities/Professional";
import { Role } from "../../entities/Role";
import { IProfessionalsRepository } from "../../repositories/ProfessionalsRepository";

export class CreateProfessionalService {
  constructor(private professionalsRepository: IProfessionalsRepository) {}

  public async execute(props: Professional, userId: string) {
    const role = await this.professionalsRepository.add(props, userId);
    return role;
  }
}
