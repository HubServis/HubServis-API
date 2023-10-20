import { Service } from "../entities/Service";

export interface IFindOneService{
  serviceId: string;
}

export interface IDeleteService{
  serviceId: string;
}

export interface IFindServiceHighlight {
	averageRating: any;
	limit: any;
}

export interface IServicesRepository {
	create(props: Service, userId: string): Promise<Error | Service>;
	find(): Promise<Error | Service[]>;
	findOne(props: IFindOneService): Promise<Error | Service>;
	delete(props: IDeleteService): Promise<Error | string>;
	findServicesHighlight(
		props: IFindServiceHighlight
	): Promise<Error | Service[]>;
}
