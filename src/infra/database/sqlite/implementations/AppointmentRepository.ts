import { Service } from "../../../../entities/Service";
import { Appointment as AppointmentSchema} from "../models/Appointment";
import { User as UserSchema } from "../models/User";
import { Service as ServiceSchema } from "../models/Service";
import { Professional as ProfessionalSchema } from "../models/Professional";
import { Business as BusinessSchema } from "../models/Business";
import Database from "../config";
import { IAppointmentsRepository } from "../../../../repositories/AppointmentRepository";
import { Appointment } from "../../../../entities/Appointment";

export class AppointmentRepositorySqlite implements IAppointmentsRepository {
  public async create(
    props: Appointment,
    userId: string
  ): Promise<Error | Appointment> {
    // const { id, name, duration, price, description } = props;

    const appointmentRepository = (await Database).getRepository(AppointmentSchema);
    const userRepository = (await Database).getRepository(UserSchema);
    const serviceRepository = (await Database).getRepository(ServiceSchema);
    const professionalRepository = (await Database).getRepository(ProfessionalSchema);
    const businessRepository = (await Database).getRepository(BusinessSchema);
    
    /*
    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ["business"],
    });

    if (!user) {
      return new Error("User not found!");
    }

    if (!user.business) {
      return new Error("The user does not have a business!");
    }*/

    const user = await userRepository.findOne({
        where: {
            id: "a7a24e6b-cada-4329-9265-ce55726cbb8d"
        }
    });

    const service = await serviceRepository.findOne({
        where: {
            id: "f692f8a3-7dd5-4f5c-a108-98eb36ff1d4f"
        },
    });

    const professional = await professionalRepository.findOne({
        where: {
            id: "489336ae-9c9d-4c02-8ef0-c047848da272"
        },
    });

    const business = await businessRepository.findOne({
        where: {
          id: "68cf108e-76a2-48f5-82c4-10e96045fe52"
        },
    });

    const appointment = await appointmentRepository.save({
        id: "1",
        date_time: "2023-08-15 10:00:00",
        status: "CONCLUIDO",
        professional,
        service,
        user,
        business
        // professional: "489336ae-9c9d-4c02-8ef0-c047848da272",
        // service: "f692f8a3-7dd5-4f5c-a108-98eb36ff1d4f",
        // business: "cded4e7f-4a56-4f29-9bf6-71dc80782e48",
        // user: "a7a24e6b-cada-4329-9265-ce55726cbb8d"
    });

    return appointment;
  }

  public async find(): Promise<Error | Appointment[]> {
    const appointmentRepository = (await Database).getRepository(AppointmentSchema);

    const appointment = await appointmentRepository.find({relations: ["user", "business", "professional"]});

    return appointment;
  }
}
