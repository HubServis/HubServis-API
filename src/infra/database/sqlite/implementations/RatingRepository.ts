import {
  ICreateRating,
  IRatingsRepository,
} from "../../../../repositories/RatingRepository";
import { Rating } from "../../../../entities/Rating";
import { Rating as RatingSchema } from "../models/Rating";
import { User as UserSchema } from "../models/User";
import { Service as ServiceSchema } from "../models/Service";
import Database from "../config";

export class RatingRepositorySqlite implements IRatingsRepository {
  async create(props: ICreateRating): Promise<Error | any> {
    const { comment, rating: ratingValue, serviceId, userId } = props;

    const serviceRepository = (await Database).getRepository(ServiceSchema);
    const service = await serviceRepository.findOne({
      where: { id: serviceId },
    });

    if (!service) return new Error("Service not found!");

    const userRepository = (await Database).getRepository(UserSchema);
    const user = await userRepository.findOne({
      where: { id: userId },
    });

    const newRating = new Rating({
      comment,
      rating: ratingValue
    });

    const ratingRepository = (await Database).getRepository(RatingSchema);
    const rating = await ratingRepository.save({
      ...newRating,
      user,
      service,
    });

    return rating;

    // const serviceRepository = (await Database).getRepository(ServiceSchema);
    // const service = await serviceRepository.find({
    //   where: { id: serviceId },
    //   relations: {
    //     ratings: true
    //   }
    // });
  }
}
