import { Appointment } from "../entities/Appointment";

export interface ICreateAppointment{
  date_time: string;
  client: string;
  service: string;
  professional: string;
}

export interface IPatchStatusAppointment{
  id: string;
  status: string;
  userReqId: string;
}

export interface IAppointmentsRepository {
  create(props: ICreateAppointment): Promise<Error | Appointment>;
  find(): Promise<Error | Appointment[]>;
  patch(props: IPatchStatusAppointment): Promise<Error | Appointment>;
}
