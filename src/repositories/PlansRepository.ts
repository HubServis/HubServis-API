import { Plans } from "../entities/Plans";

export type PlansRepository = {
  planId: string;
};

export interface IPlansRepository {
  create(props): Promise<Error | Plans>;
  delete(props): Promise<Error | String>;
  patch(props): Promise<Error | Plans>;
}
