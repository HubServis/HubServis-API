import Database from "../infra/database/postgres/config";

import { Request, Response } from "express";

import { SessionService } from "../services/session/SessionServices";

import { SessionRepositoryPostgres } from "../infra/database/postgres/implementations/SessionRepository";

import { User as UserSchema } from "../infra/database/postgres/models/User";

const sessionService = new SessionService(new SessionRepositoryPostgres());

export const refreshHandler = async (req: Request, res: Response) => {
  try {
    if (!req.cookies) {
      return res.status(401).end();
    }

    const sessionCookie = req.cookies["session"];

    if (!sessionCookie) {
      return res.status(401).end();
    }

    const { userId } = await JSON.parse(sessionCookie);

    if (!userId) {
      return res.status(401).end();
    }

    const hasSessionToken = await sessionService.hasToken(userId);

    if (!hasSessionToken) {
      return res.status(401).end();
    }

    const now = new Date();

    if (+now + hasSessionToken.expiresAt < new Date()) {
      await sessionService.remove(userId);

      return res.status(401).end();
    }

    const userRepository = (await Database).getRepository(UserSchema);

    const user = await userRepository.findOne({ where: { id: userId } });

    const maxAgeForThreeHours = 3 * 60 * 60 * 1000;

    const newSession = await sessionService.create({
      expiration: String(maxAgeForThreeHours),
      user: userId,
      email: user.email,
    });

    return res
      .cookie("session", JSON.stringify(newSession), {
        maxAge: maxAgeForThreeHours,
        httpOnly: true,
        domain: process.env.COOKIE_DOMAIN,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        signed: process.env.NODE_ENV === "production",
      })
      .sendStatus(200);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
