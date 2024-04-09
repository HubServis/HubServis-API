import { Request, Response } from "express";

import { SessionRepositoryPostgres } from "../infra/database/postgres/implementations/SessionRepository";

import { SessionService } from "../services/session/SessionServices";

const sessionService = new SessionService(new SessionRepositoryPostgres());

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    if (!req.cookies) {
      return res.status(401).end();
    }

    const hasSession = req.cookies["session"];

    if (!hasSession) {
      return res.redirect("/login");
    }

    const session = JSON.parse(hasSession);

    await sessionService.remove(session);

    return res
      .cookie("session", "", { expires: new Date(0) })
      .json(true)
      .status(200)
      .end();
  } catch (error) {
    console.log("There was an error", error);
  }
};
