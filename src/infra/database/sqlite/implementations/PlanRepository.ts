import Database from "../config";

import {
  IPlanUpdate,
  IPlanRepository,
  IPlanBenefitNames,
} from "../../../../repositories/PlansRepository";

import { Plan } from "../../../../entities/Plan";
import { Plan as PlanSchema } from "../models/Plan";
import { Benefit as BenefitSchema } from "../models/Benefit";

export class PlansRepositorySqlite implements IPlanRepository {
  public async create(props: Plan): Promise<string | Plan | Error> {
    const {
      id,
      name,
      price,
      description,
      month_price,
      client_limit,
      customer_limit,
      reminder_limit,
      professional_limit,
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
      description,
      month_price,
      client_limit,
      customer_limit,
      reminder_limit,
      professional_limit,
    });

    return plan;
  }

  public async find(props: string): Promise<Error | Plan[]> {
    const planRepository = (await Database).getRepository(PlanSchema);

    const plan = await planRepository.find({
      where: { name: props },
      relations: { benefits: true },
    });

    if (!plan) return new Error("This Plan not Exists!");

    return plan;
  }

  public async delete(props: string): Promise<string | Error> {
    const planRepository = (await Database).getRepository(PlanSchema);

    const plan = await planRepository.findOne({
      where: { name: props },
    });

    if (!plan) return new Error("This Plan not Exists");

    await planRepository.remove(plan);

    return `Plan with name ${plan} removed!`;
  }

  public async patch(props: IPlanUpdate): Promise<string | Error> {
    const planRepository = (await Database).getRepository(PlanSchema);

    const plan = await planRepository.findOne({
      where: { name: props.planName },
      relations: { benefits: true },
    });

    if (!plan) return new Error("This Plan not Exist!");

    plan.name = props.newPlan.name;
    plan.price = props.newPlan.price;
    plan.description = props.newPlan.description;
    plan.month_price = props.newPlan.month_price;
    plan.client_limit = props.newPlan.client_limit;
    plan.customer_limit = props.newPlan.customer_limit;
    plan.reminder_limit = props.newPlan.reminder_limit;
    plan.professional_limit = props.newPlan.professional_limit;

    await planRepository.save(plan);

    return `Plan with name ${props.planName} Edited Successfuly`;
  }

  public async appendBenefit(
    props: IPlanBenefitNames
  ): Promise<string | Error> {
    const { planName, benefitName } = props;

    const planRepository = (await Database).getRepository(PlanSchema);

    const benefitRepository = (await Database).getRepository(BenefitSchema);

    const plan = await planRepository.findOne({
      where: { name: planName },
      relations: { benefits: true },
    });

    if (!plan) return new Error("This Plan not Exists!");

    const benefit = await benefitRepository.findOne({
      where: { name: benefitName },
    });

    if (!benefit) return new Error("This Benefit not Exists!");

    const alreadyRegistered = plan.benefits.find(
      (element) => element.name === benefitName
    );

    if (alreadyRegistered)
      return new Error(
        `The Benefit ${benefitName} Already Exists in the ${planName} Plan`
      );

    plan.benefits.push(benefit);

    await planRepository.save(plan);

    return `Benefit ${benefitName} Successfully Inserted into the ${planName} plan`;
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
