import { Business } from "../entities/Business";

export interface IFindOneBusiness{
  businessId: string;
}

export interface IBusinessRepository {
  create(props: Business, userId: string): Promise<Business | Error>;
  find(): Promise<Business[]>;
  findOne(props: IFindOneBusiness): Promise<Business | Error>;
}
