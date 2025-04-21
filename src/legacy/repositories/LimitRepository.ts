import { Limit } from "../entities/Limit";

export interface ILimitUpdate {
  newLimit: Limit
}

// export interface IPlanBenefitNames {
//   planName: string;
//   benefitName: string;
// }

export interface ILimitRepository {
  create(props: Limit): Promise<Error | Limit | string>;
  find(): Promise<Error | Limit[]>;
  delete(props: string): Promise<Error | string>;
  patch(props: ILimitUpdate): Promise<Error | string>;
}
