import Database from "../config";

import {
  IPlanUpdate,
  IPlanRepository,
  IPlanBenefitNames,
  IAddBenefitsToPlan,
  IAddLimitsToPlan,
  IPlanLimitNames,
} from "../../../../repositories/PlansRepository";

import { Plan } from "../../../../entities/Plan";
import { Plan as PlanSchema } from "../models/Plan";
import { Benefit as BenefitSchema } from "../models/Benefit";
import { Limit as LimitSchema } from "../models/Limit";
import { In } from "typeorm";
import { log } from "console";

export class PlansRepositoryPostgres implements IPlanRepository {
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
    const { planId, benefitId } = props;

    const planRepository = (await Database).getRepository(PlanSchema);

    const plan = await planRepository.findOne({
      where: { id: planId },
      relations: { benefits: true },
    });

    if (!plan) return new Error("This Plan not Exists!");

    const benefitExistInPlan = plan.benefits.filter(
      (benefit) => benefit.id == benefitId
    );

    if(benefitExistInPlan.length == 0) return new Error("Benefit informed not exist in plan!");

      log(benefitExistInPlan);

    const reducedPlanBenefits = plan.benefits.map(
      (benefitPlan) => benefitPlan.id !== benefitId && benefitPlan
    );

    plan.benefits = reducedPlanBenefits;

    await planRepository.save(plan);

    return `Benefit informed successfully removed from '${plan.name}' plan`;
  }

  public async appendLimit(
    props: IAddLimitsToPlan
  ): Promise<string | Error> {
    const { planId, limitsId } = props;

    const planRepository = (await Database).getRepository(PlanSchema);
    const limitRepository = (await Database).getRepository(LimitSchema);

    const plan = await planRepository.findOne({
      where: { id: planId },
      relations: { limits: true },
    });

    if (!plan) return new Error("This Plan not Exists!");

    // // Checks that the benefits to be added are not duplicated
    const limitsToAdd = limitsId.filter(limitId => !plan.limits.some(limitPlan => limitPlan.id === limitId));

    if(limitsToAdd.length == 0) return new Error("These limits have already been added!");

    const limits = await limitRepository.findBy({
      id: In(limitsToAdd)
    });
    
    if (limits.length == 0) return new Error("This limits not Exists!");

    plan.limits = plan.limits.concat(limits);

    await planRepository.save(plan);
    
    return "Updated limits!";
  }

  public async deleteLimit(
    props: IPlanLimitNames
  ): Promise<string | Error> {
    const { planId, limitId } = props;

    const planRepository = (await Database).getRepository(PlanSchema);

    const plan = await planRepository.findOne({
      where: { id: planId },
      relations: { limits: true },
    });

    if (!plan) return new Error("This Plan not Exists!");

    const limitExistInPlan = plan.limits.filter(
      (limit) => limit.id == limitId
    );

    if(limitExistInPlan.length == 0) return new Error("Limit informed not exist in plan!");

    const reducedPlanLimits = plan.limits.map(
      (limitPlan) => limitPlan.id !== limitId && limitPlan
    );

    plan.limits = reducedPlanLimits;

    await planRepository.save(plan);

    return `Limit informed successfully removed from '${plan.name}' plan`;
  }
}
