import { NextFunction, Request, Response } from "express";
import { config } from "dotenv";

const labelsAccess = [
  "dashboard",
  "commonUser",
  "lv1",
  "lv2",
  "lv3",
  "accountManager",
  "basicLevel",
];

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
      const result = revalidateCookie(req, res);

	  if(!result) res.json(result).status(401);

	  next();
    }

    res.send("next gateway");
    res.status(201).json(true);
  } catch (err) {
    throw new Error("there was an error to create token: ", err);
  }
};

const createCookie = (req: Request, res: Response) => {
  config();

  const { token, userId } = res.locals;

  const cookie = btoa(
    JSON.stringify({
      token: token,
      userId: userId,
      access: "[]",
    }),
  );

  res.cookie(process.env.COOKIE_DOMAIN, cookie, {
    maxAge: Number(process.env.COOKIE_AGE),
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN,
    secure: true,
    sameSite: "strict",
  });

  return true;
};

const revalidateCookie = (req: Request, res: Response) => {
  res.send("revalidated");

  const cookie = req.headers.cookie;

  return true || false;
};
