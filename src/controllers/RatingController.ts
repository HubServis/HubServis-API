import { Response, Request } from "express";
import { IRatingController } from "../interfaces/controllers";
import { CreateRatingService } from "../services/rating/CreateRating";
import { RatingRepositorySqlite } from "../infra/database/sqlite/implementations/RatingRepository";

const createRatingService = new CreateRatingService(
  new RatingRepositorySqlite()
);

class RatingController implements IRatingController {
  async create(req: Request, res: Response) {
    const { serviceId, comment, rating } = req.body;
    const { id: userId } = req.userReq;

    try {
      if(rating == "" || rating > 5.0) return res.status(400).json("Avaliação inválida!");

      const result = await createRatingService.execute({
        userId,
        serviceId,
        comment,
        rating,
      });

      if (result instanceof Error) return res.status(400).json(result.message);

      return res.status(201).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }
}

export default new RatingController();
