import { Category } from "../entities/Category";
import { Service } from "../entities/Service";

export interface ICreateCategory {
    name: string;
    description: string;
    userId: string;
}

export interface IAppendCategoryService {
    service: string;
    categories: Array<string>;
}

export interface ICategoryRepository {
    create(props: ICreateCategory): Promise<Error | Category>;
    find(): Promise<Error | Category[]>;
    appendService(props: IAppendCategoryService): Promise<Error | Service>;
    // patch(props: IPatchStatusAppointment): Promise<Error | Appointment>;
  }