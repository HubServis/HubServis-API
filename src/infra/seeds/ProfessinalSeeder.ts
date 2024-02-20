import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../database/postgres/models/User";
import Blocking from "../database/postgres/models/Blocking";
import Business from "../database/postgres/models/Business";
import Expedient from "../database/postgres/models/Espedient";
import Appointment from "../database/postgres/models/Appointment";
import { Professional } from "../database/postgres/models/Professional";

export default class ProfesionalSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepo = dataSource.getRepository(User);
    const businessRepo = dataSource.getRepository(Business);
    const blockingsRepo = dataSource.getRepository(Blocking);
    const expediencysRepo = dataSource.getRepository(Expedient);
    const appointmentsRepo = dataSource.getRepository(Appointment);
    const professionalRepo = dataSource.getRepository(Professional);

    const user = await userRepo.findOne({ where: { name: "Ramilthon BMW 2" } });
    const business = await businessRepo.findOne({ where: { name: 'HubServis' } });
    const expediencys = await expediencysRepo.findOne({ where: { name: "Novo expediente" } });
    const appointments = await appointmentsRepo.find({ where: { date_time: '20-02-2024-ISO' } });
    const blockings = await blockingsRepo.findOne({ where: { dateTimeStart: '20-02-2024-ISO' } });

    const professionalData: Omit<Professional, "id" | "created_at"> = {
      name: "Romário",
      cpfcnpj: "123-456-789-01",
      isRegistred: true,
      user: user,
      business: business,
      appointments: appointments,
      blockings: blockings,
      expediencys: expediencys,
    };

    const newProfessional = professionalRepo.create(professionalData);

    await professionalRepo.save(newProfessional);
  }
}
