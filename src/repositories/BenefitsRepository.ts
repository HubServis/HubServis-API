import { Benefit } from "../entities/Benefit";

type PlansRepositoryPatch = {
  benefitName: string;
  newBenefit: Benefit;
};

export interface IBenefitRepository {
  create(props: Benefit): Promise<Error | Benefit | String>;
  delete(props: string): Promise<Error | String>;
  patch(props: PlansRepositoryPatch): Promise<Error | Benefit | String>;
  find(props: string): Promise<Error | Benefit[]>
}
