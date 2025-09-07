import { JwtPayload } from "jsonwebtoken";

import { Benefit, Plan, User } from "../../../generated/prisma";

export type UserDataDecodedType = (JwtPayload & { user: Omit<User, "password"> & { plan: Plan & { benefits: Benefit[] } } }) | void;
export type OAuthUserDataDecodedType =
    | (JwtPayload & {
          user: Omit<User, "password"> & { plan: Plan & { benefits: Benefit[] } };
          provider: "google" | "facebook" | "github" | "linkedin";
      })
    | void;
