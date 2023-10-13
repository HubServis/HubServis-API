import { Benefit } from "../entities/Benefit";

import { Plan } from "../entities/Plan";

export interface IPlanUpdate {
  name: string;
  price: number;
  planId: string;
  description: string;
}

export interface IAddBenefitsToPlan{
  planId: string;
  benefitsId: string[];
}

export interface IPlanBenefitNames {
  planName: string;
  benefitName: string;
}

export interface IPlanRepository {
  create(props: Plan): Promise<Error | Plan | string>;
  find(props: string): Promise<Error | Plan[]>;
  delete(props: string): Promise<Error | string>;
  patch(props: IPlanUpdate): Promise<Error | string>;

  appendBenefit(props: IAddBenefitsToPlan): Promise<Error | string>;
  deleteBenefit(props: IPlanBenefitNames): Promise<Error | string>;
}
