import { Category } from "../entities/Category";
import { Service } from "../entities/Service";
import { CustomError, IObjectCustomError } from "../interfaces/errors";

export interface ICreateCategory {
    name: string;
    description: string;
    userId: string;
}

export interface IAppendCategoryService {
    service: string;
    categories: Array<string>;
}

export interface IDeleteCategory{
    category: string;
    userId: string;
}

export interface IFindCategory{
    showAll: any,
    showPrivateOnly: any
}

export interface IListServicesCategory {
	categoryNameId: any;
}

export interface ICategoryRepository {
	create(props: ICreateCategory): Promise<Error | Category>;
	find(props: IFindCategory): Promise<Error | Category[]>;
	appendService(props: IAppendCategoryService): Promise<Error | Service>;
	delete(props: IDeleteCategory): Promise<Error | string>;
	listServicesCategory(
		props: IListServicesCategory
	): Promise<Error | Service[] | CustomError>;
	// patch(props: IPatchStatusAppointment): Promise<Error | Appointment>;
}