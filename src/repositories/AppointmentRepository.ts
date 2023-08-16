import { Appointment } from "../entities/Appointment";


export interface IAppointmentsRepository {
  create(props: Appointment, userId: string): Promise<Error | Appointment>;
  find(): Promise<Error | Appointment[]>;
}
