import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../../database/postgres/models/User";
import { hash } from "bcrypt";

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    const userData: Omit<
      User,
      | "id"
      | "ratings"
      | "plan"
      | "category"
      | "created_at"
      | "professional"
      | "extras"
      | "image"
      | "appointments"
      | "business"
    > = {
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
