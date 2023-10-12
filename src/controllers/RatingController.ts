import { Response, Request } from "express";
import { IRatingController } from "../interfaces/controllers";
import { CreateRatingService } from "../services/rating/CreateRating";
import { RatingRepositorySqlite } from "../infra/database/sqlite/implementations/RatingRepository";
import { DeleteRatingService } from "../services/rating/DeleteRating";
import { FindRatingService } from "../services/rating/FindAllRating";
import { PatchRatingService } from "../services/rating/PatchRating";

const createRatingService = new CreateRatingService(
  new RatingRepositorySqlite()
);

const deleteRatingService = new DeleteRatingService(
  new RatingRepositorySqlite()
);

const findAllRatingService = new FindRatingService(
  new RatingRepositorySqlite()
);

const patchRatingService = new PatchRatingService(
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

  async delete(req: Request, res: Response) {
    const { ratingId } = req.params;

    if(ratingId == "" || ratingId == null) return res.status(400).json("Assessment ID not provided!")

    try {
      const result = await deleteRatingService.execute({
        ratingId,
      });

      if(result instanceof Error) return res.status(400).json(result.message);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }

  async patch(req: Request, res: Response) {
    const { ratingId } = req.params;
    const { comment, rating } = req.body;

    if(rating == "" || rating > 5.0) return res.status(400).json("Avaliação inválida!");

    try {
      const result = await patchRatingService.execute({
        ratingId,
        comment,
        rating
      });

      if(result instanceof Error) return res.status(400).json(result.message);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }

  async findAll(req: Request, res: Response) {
    // if(ratingId == "" || ratingId == null) return res.status(400).json("Assessment ID not provided!")

    try {
      const result = await findAllRatingService.execute();

      return res.status(200).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }
}

export default new RatingController();
