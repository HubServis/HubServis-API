import { Extra } from "../entities/Extra";

export interface IExtraUpdate {
  newExtra: Extra
}

// export interface IPlanBenefitNames {
//   planName: string;
//   benefitName: string;
// }

export interface IExtraRepository {
  create(props: Extra): Promise<Error | Extra | string>;
  // find(): Promise<Error | Extra[]>;
  // delete(props: string): Promise<Error | string>;
  // patch(props: IExtraUpdate): Promise<Error | string>;
}
