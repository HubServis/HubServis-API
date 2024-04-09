import Database from "../infra/database/postgres/config";

import { Request, Response } from "express";

import { SessionService } from "../services/session/SessionServices";

import { SessionRepositoryPostgres } from "../infra/database/postgres/implementations/SessionRepository";

import { User as UserSchema } from "../infra/database/postgres/models/User";

import { compare } from "bcryptjs";

const sessionService = new SessionService(new SessionRepositoryPostgres());

export const signinHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "Email or password are incorrect!" });
    }

    const userRepository = (await Database).getRepository(UserSchema);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Email or password are incorrect!" });
    }

    const maxAgeForThreeHours = 60 * 60 * 3 * 1000;

    const userId = await sessionService.create({
      expiration: String(maxAgeForThreeHours),
      user: user.id,
      email: user.email,
    });

    return res
      .cookie("session", JSON.stringify(userId), {
        maxAge: maxAgeForThreeHours,
        httpOnly: true,
        domain: process.env.COOKIE_DOMAIN,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        signed: process.env.NODE_ENV === "production",
      })
      .status(200)
      .end();
  } catch (error) {
    console.log("There was an error", error);
  }
};
