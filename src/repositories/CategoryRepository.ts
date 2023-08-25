import { Category } from "../entities/Category";

export interface ICreateCategory {
    name: string;
    description: string;
}

export interface ICategoryRepository {
    create(props: ICreateCategory): Promise<Error | Category>;
    // find(): Promise<Error | Appointment[]>;
    // patch(props: IPatchStatusAppointment): Promise<Error | Appointment>;
  }