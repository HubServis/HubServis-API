import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { StatusAppointment } from "../../enums/models";
import { User } from "../database/postgres/models/User";
import Appointment from "../database/postgres/models/Appointment";
// import Service from "../database/postgres/models/Service";
// import Business from "../database/postgres/models/Business";
// import { Professional } from "../database/postgres/models/Professional";

export default class AppointmentSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepo = dataSource.getRepository(User);
    const appointmentRepo = dataSource.getRepository(Appointment);
    // const serviceRepo = dataSource.getRepository(Service);
    // const businessRepo = dataSource.getRepository(Business);
    // const professional = dataSource.getRepository(Professional);

    // const services = await serviceRepo.find();
    // const business = await businessRepo.find();
    // const professionals = await professionalRepo.find();
    const user = await userRepo.findOne({ where: { name: "Ramilthon BMW 2" } });

    const appointmentData: Omit<
      Appointment,
      "id" | "business" | "professional" | "service" | "created_at"
    > = {
      status: StatusAppointment.PENDING,
      date_time: "20-02-2024-ISO",
      user: user,
      // business: business,
      // service: services
      // professional: professionals,
    };

    const newAppointment = appointmentRepo.create(appointmentData);

    await appointmentRepo.save(newAppointment);
  }
}
