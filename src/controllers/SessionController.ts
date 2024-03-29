import { Response, Request } from "express";
import { SessionService } from "../services/session/SessionServices";
import { SessionRepositorySqlite } from "../infra/database/sqlite/implementations/SessionRepository";

const sessionService = new SessionService(new SessionRepositorySqlite());

class SessionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const result = await sessionService.execute({ email, password });

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

	  const cookie = res.cookie('hubservis', 'test', { maxAge: 24000, httpOnly: true })

      return res.status(201).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Unexpected error");
    }
  }
}

export default new SessionController();
