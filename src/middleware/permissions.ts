import { Request, Response, NextFunction } from "express";

import Database from "../infra/database/sqlite/config";
import { User as UserSchema } from "../infra/database/sqlite/models/User";

// verifica apenas permissions
// export function can(permissionsRoutes: string[]) {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const { userId } = req;
//
//     const userRepository = (await Database).getRepository(UserSchema);
//     const user = await userRepository.findOne({
//       where: { id: userId },
//       relations: ["permissions"],
//     });
//
//     if (!user) {
//       return res.status(400).json("User does not exists!");
//     }
//
//     const permissionsExists = user.permissions
//       .map((permission) => permission.name)
//       .some((permission) => permissionsRoutes.includes(permission));
//
//     if (!permissionsExists) {
//       return res.status(401).end();
//     }
//
//     return next();
//   };
// }

// roles apneas
export function is(rolesRoutes: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req;

    const userRepository = (await Database).getRepository(UserSchema);

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["roles"],
    });

    if (!user) {
      return res.status(400).json("User does not exists!");
    }

    const rolesExists = user.plan.benefits
      .map((role) => role.name)
      .some((role) => rolesRoutes.includes(role));

    if (!rolesExists) {
      return res.status(401).end();
    }

    return next();
  };
}
