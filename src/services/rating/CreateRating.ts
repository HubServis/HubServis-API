import { Rating } from "../../entities/Rating";
import { IRatingsRepository, ICreateRating } from "../../repositories/RatingRepository";

export class CreateRatingService {
  constructor(private ratingsRepository: IRatingsRepository) {}

  public async execute(props: ICreateRating) {
    const rating = await this.ratingsRepository.create(props);
    return rating;
  }
}
