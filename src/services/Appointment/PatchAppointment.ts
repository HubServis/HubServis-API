import { Appointment } from "../../entities/Appointment";
import { IAppointmentsRepository, IPatchStatusAppointment } from "../../repositories/AppointmentRepository";

export class PatchAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute(props: IPatchStatusAppointment): Promise<Error | Appointment> {
    const appointments = await this.appointmentsRepository.patch(props);
    return appointments;
  }
}