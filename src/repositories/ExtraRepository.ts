import { Extra } from "../entities/Extra";

export interface IExtraUpdate {
  newExtra: Extra
}

export interface IExtraCreate {
  userId: string,
  newExtra: Extra
}

// export interface IPlanBenefitNames {
//   planName: string;
//   benefitName: string;
// }

export interface IExtraRepository {
	create(props: IExtraCreate): Promise<Error | Extra | string>;
	// find(): Promise<Error | Extra[]>;
	// delete(props: string): Promise<Error | string>;
	// patch(props: IExtraUpdate): Promise<Error | string>;
}
