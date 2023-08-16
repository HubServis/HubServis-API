import { Appointment } from "../../entities/Appointment";
import { IAppointmentsRepository } from "../../repositories/AppointmentRepository";

export class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute(props: Appointment, userId: string) {
    const appointment = await this.appointmentsRepository.create(props, userId);
    return appointment;
  }
}
