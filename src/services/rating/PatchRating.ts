import { Rating } from "../../entities/Rating";
import { IRatingsRepository, IUpdateRating } from "../../repositories/RatingRepository";

export class PatchRatingService {
  constructor(private ratingsRepository: IRatingsRepository) {}

  public async execute(props: IUpdateRating) {
    const rating = await this.ratingsRepository.patch(props);
    return rating;
  }
}
