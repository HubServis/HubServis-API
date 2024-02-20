import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import Rating from "../database/postgres/models/Rating";
import { Service } from "../database/postgres/models/Service";
import { User } from "../database/postgres/models/User";

export default class RatingSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepo = dataSource.getRepository(User);
    const ratingRepo = dataSource.getRepository(Rating);
    const serviceRepo = dataSource.getRepository(Service);

    const user = await userRepo.findOne({ where: { name: "Ramilthon BMW 2" } });
    const service = await serviceRepo.findOne({ where: { name: "teste" } });

    const ratingData: Omit<Rating, "id" | "created_at"> = {
      rating: 1,
      comment: "Mau produto!",
      user: user,
      service: service,
    };

    const newRating = ratingRepo.create(ratingData);

    await ratingRepo.save(newRating);
  }
}
