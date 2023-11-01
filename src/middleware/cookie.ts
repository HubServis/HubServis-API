import { NextFunction, Request, Response } from "express";

import { UserRepositorySqlite } from "../infra/database/sqlite/implementations/UserRepository";

import { ICookie } from "../interfaces/cookie";

import { GetUserPermissions } from "../services/user/getUserPermissions";

import { config } from "dotenv";

const getUserPermissions = new GetUserPermissions(new UserRepositorySqlite());

export const cookieGateway = (permissions?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.path === "/login") {
        const result = createCookie(req, res);

        return res.json(result).status(200);
      } else {
        // revalidateCookie(req, res);

        const result = await verifyAccess(req, res, next, permissions);

        if (result !== true) return res.end();

        else next();
      }
    } catch (err) {
      throw new Error("Error to proceed gateway: ", err);
    }
  };
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

    res.json("created").status(201);
  } catch (err) {
    return res.status(500).json(`There was an error creating cookie: ${err}`);
  }
};

const verifyAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
  permissions: string[],
): Promise<Boolean | Error | Response> => {
  try {
    config();

    const cookie = req.cookies[process.env.COOKIE_DOMAIN];

    if (!cookie || cookie === undefined)
      return res.status(401).json("user does not have cookie");

    const buffCookie = Buffer.from(cookie, "base64");
    const cookieData: { token: string; userId: string; access: string[] } =
      JSON.parse(buffCookie.toString("ascii"));

    const result = await getUserPermissions.execute({
      userId: cookieData,
      requestedPermissions: permissions,
    });

    if (result !== true) { return result };

    next();
  } catch (err) {
    return res.status(500).json(`There was an error on verifyAccess: ${err}`);
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
