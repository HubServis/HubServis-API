import { Professional } from "../../entities/Professional";
import { Role } from "../../entities/Role";
import { IProfessionalsRepository } from "../../repositories/ProfessionalsRepository";

export class FindProfessionalsService{
    constructor(
        private professionalsRepository: IProfessionalsRepository
    ){}

    public async execute(){
        const professionals = await this.professionalsRepository.findAll();
        return professionals;
    }
}