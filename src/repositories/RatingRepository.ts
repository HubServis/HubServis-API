import { Rating } from "../entities/Rating";

export interface ICreateRating{
    userId: string;
    serviceId: string;
    comment: string;
    rating: number;
}

export interface IDeleteRating{
    ratingId: string;
}

export interface IRatingsRepository {
    create(props: ICreateRating): Promise<Error | Rating>;
    delete(props: IDeleteRating): Promise<Error | Rating>;
  }