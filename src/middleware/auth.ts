import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

interface ITokenUser {
  id: string;
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization === undefined) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = req.headers.authorization;

  jwt.verify(token, process.env.SECRET_JWT, (err: Error, token: ITokenUser) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userReq = {
      id: token.id,
    };
  });

  next();
}
