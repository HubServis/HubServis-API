import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

interface ITokenUser {
  id: string;
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers?.authorization;

  if (!token) {
    return res.status(400).json({ message: "Token not informed!" });
  }

  jwt.verify(token, process.env.SECRET_JWT, (err: Error, token: ITokenUser) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userReq = {
      id: token.id,
    };
    
    next();
  });
}
