import { Benefit } from "../entities/Benefit";

import { Plan } from "../entities/Plan";

export interface IPlanUpdate {
  planName: string;
  newPlan: Plan;
}

export interface IPlanAppend {
  planName: string;
  benefitName: Benefit;
}

export interface IPlanRepository {
  create(props: Plan): Promise<Error | Plan | string>;
  find(props: string): Promise<Error | Plan[]>;
  delete(props: string): Promise<Error | string>;
  patch(props: IPlanUpdate): Promise<Error | Plan | string>;
  append(props: IPlanAppend): Promise<Error | string>;
}
