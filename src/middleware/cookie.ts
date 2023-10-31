import { NextFunction, Request, Response } from "express";

import { config } from "dotenv";

export const cookieGateway = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.path === "/login") {
      const result = createCookie(req, res);

      return res.json(result).status(200);
    } else {
      revalidateCookie(req, res);

      const result = verifyAccess(req, res, next);

      if (!result) res.json(result).status(401);

      next();
    }
  } catch (err) {
    throw new Error("Error to read or create cookie Reason ", err);
  }
};

const createCookie = (req: Request, res: Response) => {
  try {
    config();

    const { token, userId } = res.locals;

    const cookie = btoa(
      JSON.stringify({
        token: token,
        userId: userId,
        access: JSON.stringify(["basic"]),
      }),
    );

    res.cookie(process.env.COOKIE_DOMAIN, cookie, {
      maxAge: 60 * 1000,
      httpOnly: true,
      domain: process.env.COOKIE_DOMAIN,
      sameSite: "lax",
      // secure: true, use it when https is enabled = on server
      // signed: true, on server
      path: "/",
    });

    res.cookie("resigned", "resign", {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      domain: process.env.COOKIE_DOMAIN,
      sameSite: "lax",
      // secure: true, use it when https is enabled = on server
      path: "/",
    });

    return true;
  } catch (err) {
    new Error("Error creating cookie: ", err);
  }
};

const verifyAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    config();

    const cookie = req.cookies[process.env.COOKIE_DOMAIN];

    const buffCookie = Buffer.from(cookie, "base64");
    const cookieData = buffCookie.toString("ascii");

    //const result = await someServiceAccessToUserData.execute();

    // if (!result) {
    //   res.status(401).json("Not have permission!");
    // }

    next();
  } catch (err) {
    throw new Error("there was an error verifyAccess: ", err);
  }
};

const revalidateCookie = (req: Request, res: Response) => {
  try {
    config();

    const cookie = req.cookies[process.env.COOKIE_DOMAIN];
    const revalidate = req.cookies["resigned"];

    if (!cookie && !revalidate)
      res.status(401).json("User does not have cookie!");

    if (!cookie && revalidate)
      res.cookie(process.env.COOKIE_DOMAIN, cookie, {
        maxAge: 60 * 1000,
        httpOnly: true,
        domain: process.env.COOKIE_DOMAIN,
        // secure: true, use it when https is enabled = on server
        // signed: true, on server
        path: "/",
      });

    return true;
  } catch (err) {
    new Error("Error revalidate Cookie: ", err);
  }
};
