import jwt, { sign } from "jsonwebtoken";
import { User } from "../entities/User";

export class Token {
  sign(user: User) {
    return sign(
      {
        id: user.id,
      },
      process.env.SECRET_JWT,
      { expiresIn: "4h" }
    );
  }
}
