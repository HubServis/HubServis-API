import { Rating } from "../entities/Rating";

export interface ICreateRating{
    userId: string;
    serviceId: string;
    comment: string;
    rating: number;
}

export interface IRatingsRepository {
    create(props: ICreateRating): Promise<Error | Rating>;
  }