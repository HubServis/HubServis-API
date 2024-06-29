import { Response, Request, NextFunction } from "express";
import { SessionService } from "../services/session/SessionServices";
import { SessionRepositoryPostgres } from "../infra/database/postgres/implementations/SessionRepository";
import { ForgotPasswordService } from "../services/session/ForgotPassService";

const sessionService = new SessionService(new SessionRepositoryPostgres());
const forgotPasswordService = new ForgotPasswordService(
  new SessionRepositoryPostgres()
);

class SessionController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
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

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    try {
      const result = await forgotPasswordService.execute({
        email,
      });

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      return res.status(200).json({ messsage: "Sucess", data: result });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }
}

export default new SessionController();
