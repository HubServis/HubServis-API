import Database from "../config";

import { Benefit } from "../../../../entities/Benefits";
import { Benefit as BenefitSchema } from "../models/Benefits";
import { IBenefitRepository } from "../../../../repositories/BenefitsRepository";

export class BenefitRepositorySqlite implements IBenefitRepository {
  public async create(props: Benefit): Promise<Benefit | Error> {
    const { id, name, max_value, description } = props;

    const benefitRepository = (await Database).getRepository(BenefitSchema);

    const alreadyCreated = await benefitRepository.findOne({
      where: { name: name },
    });

    if (alreadyCreated) return new Error("This Benefit Already Exists");

    const benefit = await benefitRepository.save({
      id,
      name,
      max_value,
      description,
    });

    return benefit;
  }

  public async find(props: Benefit): Promise<Benefit[]> {
    const benefitRepository = (await Database).getRepository(BenefitSchema);

    const benefit = await benefitRepository.find({
      where: { id: props.id },
    });

    return benefit;
  }

  public async delete(id: string): Promise<String | Error> {
    const benefitRepository = (await Database).getRepository(BenefitSchema);

    const benefit = await benefitRepository.findOne({
      where: { id: id },
    });

    if (!benefit) return new Error("This Benefit not Exists!");

    await benefitRepository.delete(benefit);

    return `Benefit with id ${id} removed!`;
  }

  public async patch(props: {
    benefitId: string;
    newBenefit: Benefit;
  }): Promise<String | Error> {
    const benefitRepository = (await Database).getRepository(BenefitSchema);

    const benefit = await benefitRepository.findOne({
      where: { id: props.benefitId },
    });

    if (!benefit) return new Error("This Benefit not Exists!");

    benefit.max_value = props.newBenefit.max_value;
	benefit.description = props.newBenefit.description;
	benefit.name = props.newBenefit.name;

	return `Benefit Created Successfuly`
  }
}
