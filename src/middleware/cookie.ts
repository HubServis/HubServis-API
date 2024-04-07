import { NextFunction, Request, Response } from "express";

import { UserRepositoryPostgres } from "../infra/database/postgres/implementations/UserRepository";

import { GetUserPermissions } from "../services/user/getUserPermissions";

import { config } from "dotenv";
import { log } from "console";

const getUserPermissions = new GetUserPermissions(new UserRepositoryPostgres());

export const cookieGateway = (permissions?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("entered on gateway");

    try {
      if (req.path === "/login" || req.path === "/user") {
        const result = createCookie(req, res);

        console.log("createCookie cookie result", result);

        return res.json(result).status(200);
      }

      if (req.path === "/user/permissions") {
        const result: Boolean | Response | Error = await verifyAccess(
          req,
          res,
          next,
          req.body.permissions,
        );

        // console.log("verifyAccess result (30)", result);

        if (result !== true) return res.json(false).status(401);
        else return res.json(true).status(200);
      }

      if (req.path === "/logout") {
        console.log(`user ${req.cookies}, logged out (37)`);
        logout(req, res);

        return;
      }

      {
        /* if(!req.cookies["hubservis"])
        	revalidateCookie(req, res); */

        const result = await verifyAccess(req, res, next, permissions);

        console.log("verifyAccess result (49)", result);

        if (result !== true)
          return res.status(401).json("User not passed on verifyAccess!");
        else next();
      }
    } catch (err) {
      throw new Error(`Error to proceed gateway: ${err}`);
    }
  };
};

const createCookie = (_req: Request, res: Response) => {
  try {
    config();

    const { token, userId } = res.locals;

    const cookie = btoa(
      JSON.stringify({
        token: token,
        userId: userId,
        access: [],
      }),
    );

    const threeHours = 3 * 60 * 60 * 1000;
    const expiration = Number(new Date(Date.now() + threeHours));

    res.cookie("hubservis", cookie, {
      expires: new Date(expiration),
      httpOnly: true,
      domain: process.env.COOKIE_DOMAIN,
      path: "/",
      sameSite: "strict",
      // secure: true, use it when https is enabled = on server
      // signed: true, on server
    });
    res.json(true).status(201);
  } catch (err) {
    return res.status(500).json(`There was an error creating cookie: ${err}`);
  }
};

const revalidateCookie = (req: Request, res: Response) => {
  try {
    config();

    const cookie = req.cookies["hubservis"];

    if (cookie) return true;

    const revalidate = req.cookies["resigned"];

    if (!revalidate) return res.status(401).json("User does not have cookie!");

    res.cookie("hubservis", cookie, {
      maxAge: 60 * 60 * 4 * 1000,
      httpOnly: true,
      domain: process.env.COOKIE_DOMAIN,
      sameSite: "strict",
      // secure: true, use it when https is enabled = on server
      // signed: true, on server
      path: "/",
    });

    return true;
  } catch (err) {
    new Error(`Error revalidate Cookie: ${err}`);
  }
};

const verifyAccess = async (
  req: Request,
  res: Response,
  _next: NextFunction,
  permissions: string[],
): Promise<Boolean | Error | Response> => {
  try {
    config();

    const cookieData = decriptCookie(req, res);

    if (!cookieData) return res.status(401).json("User not have cookie");

    if (cookieData.access.some((access: any) => access === req.path)) return true;

    console.log("cookieData on (145)", cookieData);

    const result = await getUserPermissions.execute({
      userId: cookieData.userId,
      requestedPermissions: permissions,
    });

    console.log("this is the result for getUserPermissions (152)", result);

    if (result !== true) return res.status(401).json("User not have access!");

    cookieData.access.push(req.path);

    const reasignedCookie = btoa(JSON.stringify(cookieData));

    res.cookie("hubservis", reasignedCookie, {
      maxAge: 60 * 60 * 3 * 1000,
      httpOnly: true,
      domain: process.env.COOKIE_DOMAIN,
      sameSite: "strict",
      // secure: true, use it when https is enabled = on server
      // signed: true, on server
      path: "/",
    });

    return result;
  } catch (err) {
    return res.status(500).json(`There was an error on verifyAccess: ${err}`);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.setHeader(
      "set-cookie",
      `hubservis=; path=/; sameSite=strict; max-age=0; httpOnly=true; domain=${process.env.COOKIE_DOMAIN};`,
    );
    res.clearCookie("resigned");

    log("here I log", " cookies: ", req.cookies);

    res.json(true).status(200);
  } catch (err) {
    res.json(false).status(500);

    throw new Error(err);
  }
};

export const decriptCookie = (
  req: Request,
  _res: Response,
): { token: string; userId: string; access: any } | false => {
  config();

  const cookie = req.cookies["hubservis"];

  if (!cookie || cookie === undefined) return false;

  const buffCookie = Buffer.from(cookie, "base64");
  const cookieData: { token: string; userId: string; access: any } = JSON.parse(
    buffCookie.toString("ascii"),
  );

  return cookieData;
};
