import { Business } from "../entities/Business";

export interface IBusinessRepository {
  create(props: Business, userId: string): Promise<Business | Error>;
  find(): Promise<Business[]>;
}
