// import { Appointment } from "../../entities/Appointment";
import { IAppointmentsRepository, ICreateAppointment } from "../../repositories/AppointmentRepository";

export class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute(props: ICreateAppointment) {
    const appointment = await this.appointmentsRepository.create(props);
    return appointment;
  }
}
