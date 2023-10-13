import Database from "../config";

import {
  IPlanUpdate,
  IPlanRepository,
  IPlanBenefitNames,
  IAddBenefitsToPlan,
} from "../../../../repositories/PlansRepository";

import { Plan } from "../../../../entities/Plan";
import { Plan as PlanSchema } from "../models/Plan";
import { Benefit as BenefitSchema } from "../models/Benefit";
import { In } from "typeorm";

export class PlansRepositorySqlite implements IPlanRepository {
  public async create(props: Plan): Promise<string | Plan | Error> {
    const {
      id,
      name,
      price,
      description,
      // month_price,
      // client_limit,
      // customer_limit,
      // reminder_limit,
      // professional_limit,
    } = props;

    const planRepository = (await Database).getRepository(PlanSchema);

    const alreadyCreated = await planRepository.findOne({
      where: { name: name },
    });

    if (alreadyCreated) return new Error("This Plan Already Exists");

    const plan = await planRepository.save({
      id,
      name,
      price,
      benefits: [],
      limits: [],
      description,
      // month_price,
      // client_limit,
      // customer_limit,
      // reminder_limit,
      // professional_limit,
    });

    return plan;
  }

  public async find(props: string): Promise<Error | Plan[]> {
    const planRepository = (await Database).getRepository(PlanSchema);

    const plan = await planRepository.find({
      where: { name: props },
      relations: { benefits: true, limits: true },
    });

    if (!plan) return new Error("This Plan not Exists!");

    return plan;
  }

  public async delete(props: string): Promise<string | Error> {
    const planRepository = (await Database).getRepository(PlanSchema);

    const plan = await planRepository.findOne({
      where: { id: props },
    });

    if (!plan) return new Error("This Plan not Exists");

    await planRepository.remove(plan);

    return `Plan with name '${plan.name}' removed!`;
  }

  public async patch(props: IPlanUpdate): Promise<string | Error> {
    const { planId, description, name, price } = props;
    const planRepository = (await Database).getRepository(PlanSchema);

    const plan = await planRepository.findOne({
      where: { id: planId },
      relations: { benefits: true },
    });

    if (!plan) return new Error("This Plan not Exist!");

    plan.name = name ?? plan.name;
    plan.price = price ?? plan.price;
    plan.description = description ?? plan.description;

    await planRepository.save(plan);

    return `Plan with name ${plan.name} Edited Successfuly`;
  }

  public async appendBenefit(
    props: IAddBenefitsToPlan
  ): Promise<string | Error> {
    const { planId, benefitsId } = props;

    const planRepository = (await Database).getRepository(PlanSchema);
    const benefitRepository = (await Database).getRepository(BenefitSchema);

    const plan = await planRepository.findOne({
      where: { id: planId },
      relations: { benefits: true },
    });

    if (!plan) return new Error("This Plan not Exists!");

    // Checks that the benefits to be added are not duplicated
    const benefitToAdd = benefitsId.filter(benefitId => !plan.benefits.some(benefitPlan => benefitPlan.id === benefitId));

    if(benefitToAdd.length == 0) return new Error("These benefits have already been added!");

    const benefits = await benefitRepository.findBy({
      id: In(benefitToAdd)
    });
    
    if (benefits.length == 0) return new Error("This Benefits not Exists!");

    plan.benefits = plan.benefits.concat(benefits);

    await planRepository.save(plan);
    
    return "Updated benefits!";
  }

  public async deleteBenefit(
    props: IPlanBenefitNames
  ): Promise<string | Error> {
    const { planName, benefitName } = props;

    const planRepository = (await Database).getRepository(PlanSchema);

    const plan = await planRepository.findOne({
      where: { name: planName },
      relations: { benefits: true },
    });

    if (!plan) return new Error("This Plan not Exists!");

    const reducedPlanBenefits = plan.benefits.map(
      (benefit) => benefit.name !== benefitName && benefit
    );

    plan.benefits = reducedPlanBenefits;

    await planRepository.save(plan);

    return `Benefit ${benefitName} Successfully Removed from ${planName} plan`;
  }
}
