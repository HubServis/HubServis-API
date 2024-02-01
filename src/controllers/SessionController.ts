import { Response, Request, NextFunction } from "express";
import { SessionService } from "../services/session/SessionServices";
import { SessionRepositoryPostgres } from "../infra/database/postgres/implementations/SessionRepository";

const sessionService = new SessionService(new SessionRepositoryPostgres());

class SessionController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    const { email, password } = req.body;

    try {
      const result = await sessionService.execute({ email, password });

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      res.locals = result;

      next();
	  // res.json('logged').status(201);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }
}

export default new SessionController();
