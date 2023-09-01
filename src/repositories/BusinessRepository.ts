import { Business } from "../entities/Business";

export interface IFindOneBusiness{
  businessId: string;
}

export interface IDeleteBusiness{
  businessId: string;
  userId: string;
}

export interface IPatchBusiness{
  newBusiness: Business;
  userId: string;
}

export interface IBusinessRepository {
  create(props: Business, userId: string): Promise<Business | Error>;
  find(): Promise<Business[]>;
  findOne(props: IFindOneBusiness): Promise<Business | Error>;
  delete(props: IDeleteBusiness): Promise<string | Error>;
  patch(props: IPatchBusiness): Promise<string | Error>;
}
