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

export interface IUpdateRating{
    ratingId: string;
    comment: string;
    rating: number;
}

export interface IRatingsRepository {
    create(props: ICreateRating): Promise<Error | Rating>;
    delete(props: IDeleteRating): Promise<Error | Rating>;
    patch(props: IUpdateRating): Promise<Error | Rating>;
    findAll(): Promise<Error | Rating[]>;
  }