import { Appointment } from "../../entities/Appointment";
import { IAppointmentsRepository } from "../../repositories/AppointmentRepository";

export class FindAppointmentUserService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute(props: string): Promise<Error | Appointment[]> {
    const appointments = await this.appointmentsRepository.findAppointmentsUser(props);
    return appointments;
  }
}
