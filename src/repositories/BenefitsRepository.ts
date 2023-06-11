import { Benefit } from "../entities/Benefit";

type PlansRepositoryPatch = {
  benefitId: string;
  newBenefit: Benefit;
};

export interface IBenefitRepository {
  create(props: Benefit): Promise<Error | Benefit>;
  delete(props: string): Promise<Error | String>;
  patch(props: PlansRepositoryPatch): Promise<Error | Benefit>;
}
