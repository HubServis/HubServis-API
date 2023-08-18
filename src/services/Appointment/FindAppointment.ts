import { Appointment } from "../../entities/Appointment";
import { IAppointmentsRepository } from "../../repositories/AppointmentRepository";

export class FindAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute(): Promise<Error | Appointment[]> {
    const appointments = await this.appointmentsRepository.find();
    return appointments;
  }
}
