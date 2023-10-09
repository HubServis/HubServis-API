import { Rating } from "../../entities/Rating";
import { IRatingsRepository, IDeleteRating } from "../../repositories/RatingRepository";

export class FindRatingService {
  constructor(private ratingsRepository: IRatingsRepository) {}

  public async execute() {
    const rating = await this.ratingsRepository.findAll();
    return rating;
  }
}
