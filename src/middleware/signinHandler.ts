import Database from "../infra/database/postgres/config";

import { Request, Response } from "express";

import { SessionService } from "../services/session/SessionServices";

import { SessionRepositoryPostgres } from "../infra/database/postgres/implementations/SessionRepository";

import { User as UserSchema } from "../infra/database/postgres/models/User";

import bcrypt from "bcrypt";

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
      return res
        .status(404)
        .json({ message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("isPasswordValid", isPasswordValid);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Email or password are incorrect!" });
    }

    console.log("user", user);

    const threeHours = 60 * 60 * 3;

    const expiresIn = new Date().getTime() + threeHours;

    const session = await sessionService.execute({
      expiration: expiresIn,
      user: user.id,
      email: user.email,
    });

    return res
      .cookie("session", JSON.stringify(session), {
        expires: new Date(expiresIn),
      })
      .status(200)
      .end();
  } catch (error) {
    console.log("There was an error", error);
  }
};
