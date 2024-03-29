import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../database/sqlite/models/User";
import { hash } from "bcrypt";

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    const userData = {
      name: "Ramilthon BMW 2",
      username: "Ramilthonbmw2",
      password: await hash("ramilthon", 8),
      email: "ramilthonbmw2@gmail.com",
      cpfcnpj: "22222222211",
    };

    const newUser = userRepository.create(userData);
    await userRepository.save(newUser);
  }
}
