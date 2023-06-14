import Database from "../config";

import { Benefit } from "../../../../entities/Benefit";
import { Benefit as BenefitSchema } from "../models/Benefit";
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

  public async find(): Promise<Benefit[]> {
    const benefitRepository = (await Database).getRepository(BenefitSchema);

    const benefit = await benefitRepository.find();

    return benefit;
  }

  public async delete(name: string): Promise<string | Error> {
    const benefitRepository = (await Database).getRepository(BenefitSchema);

    const benefit = await benefitRepository.findOne({
      where: { name: name },
    });

    if (!benefit) return new Error("This Benefit not Exists!");

    await benefitRepository.remove(benefit);

    return `Benefit with name: ${name} removed!`;
  }

  public async patch(props: {
    benefitName: string;
    newBenefit: Benefit;
  }): Promise<string | Error> {
    const benefitRepository = (await Database).getRepository(BenefitSchema);

    const benefit = await benefitRepository.findOne({
      where: { name: props.benefitName },
    });

    if (!benefit) return new Error("This Benefit not Exists!");

    benefit.max_value = props.newBenefit.max_value;
    benefit.description = props.newBenefit.description;
    benefit.name = props.newBenefit.name;

    await benefitRepository.save(benefit);

    return `Benefit Edited Successfuly`;
  }
}
