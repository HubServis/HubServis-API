import { Limit } from "../entities/Limit";

// export interface IPlanUpdate {
//   planName: string;
//   newPlan: Plan;
// }

// export interface IPlanBenefitNames {
//   planName: string;
//   benefitName: string;
// }

export interface ILimitRepository {
  create(props: Limit): Promise<Error | Limit | string>;
  find(): Promise<Error | Limit[]>;
}
