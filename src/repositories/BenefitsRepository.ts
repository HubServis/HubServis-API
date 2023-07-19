import { Benefit } from "../entities/Benefit";

interface PlansRepositoryPatch {
  benefitName: string;
  newBenefit: Benefit;
}

export interface IBenefitRepository {
  create(props: Benefit): Promise<Error | Benefit | string>;
  find(props: string): Promise<Error | Benefit[]>;
  delete(props: string): Promise<Error | string>;
  patch(props: PlansRepositoryPatch): Promise<Error | Benefit | string>;
}
