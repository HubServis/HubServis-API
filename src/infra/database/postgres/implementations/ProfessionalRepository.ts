import { Professional as ProfessionalSchema } from "../models/Professional";
import Database from "../config";
import { User as UserSchema } from "../models/User";
import { IProfessionalsRepository } from "../../../../repositories/ProfessionalsRepository";
import { Professional } from "../../../../entities/Professional";

export class ProfessionalRepositoryPostgres implements IProfessionalsRepository {
  public async add(
    props: Professional,
    userId: string
  ): Promise<Error | Professional> {
    const { id, name, cpfcnpj, isRegistered } = props;

    const ownerBusinessRepository = (await Database).getRepository(UserSchema);
    const owner = await ownerBusinessRepository.findOne({
      where: { id: userId },
      relations: ["business"],
    });

    if (!owner) {
      return new Error("Business owner not found!");
    }

    if (!owner.business) {
      return new Error("Business not found!");
    }

    if (isRegistered) {
      const userRepository = (await Database).getRepository(UserSchema);
      const user = await userRepository.findOne({
        where: {
          cpfcnpj,
        },
      });

      if (!user) {
        return new Error("User not found!");
      }

      const professionalRepository = (await Database).getRepository(
        ProfessionalSchema
      );
      const professional = await professionalRepository.save({
        id,
        name: user.name,
        cpfcnpj: user.cpfcnpj,
        isRegistered,
        business: owner.business,
        user,
      });

      return professional;
    }

    const professionalRepository = (await Database).getRepository(
      ProfessionalSchema
    );
    const professional = await professionalRepository.save({
      id,
      name,
      cpfcnpj,
      isRegistered,
      business: owner.business,
    });

    return professional;
  }

  public async findAll(): Promise<Error | Professional[]> {
    const professionalRepository = (await Database).getRepository(
      ProfessionalSchema
    );
    const professionals = await professionalRepository.find({
      relations: {
        business: true,
        user: true,
      },
      select: {
        user: {
          username: true,
          id: true,
          cpfcnpj: true,
          email: true,
          name: true,
          created_at: true,
        },
      },
    });

    return professionals;
  }
}
