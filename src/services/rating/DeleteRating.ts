import { Rating } from "../../entities/Rating";
import { IRatingsRepository, IDeleteRating } from "../../repositories/RatingRepository";

export class DeleteRatingService {
  constructor(private ratingsRepository: IRatingsRepository) {}

  public async execute(props: IDeleteRating) {
    const rating = await this.ratingsRepository.delete(props);
    return rating;
  }
}
