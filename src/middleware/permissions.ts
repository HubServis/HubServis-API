import Database from "../infra/database/postgres/config";

import { Request, Response, NextFunction } from "express";

import { User as UserSchema } from "../infra/database/postgres/models/User";

// Verifica assinatura para ver o nível de permissão
export function is(permissionsRoutes: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userReq } = req;

    const userRepository = (await Database).getRepository(UserSchema);

    const user = await userRepository.findOne({
      where: { id: userReq.id },
      relations: {
        plan: true,
      },
    });

    if (!user) return res.status(400).json("User does not exists!");

    const acceptablePlanLevel = permissionsRoutes.includes(user.plan.name);

    if (!acceptablePlanLevel)
      return res
        .status(401)
        .json(`Unauthorized, This Plan is Not Allowed`)
        .end();

    return next();
  };
}

// Verifica roles inclusas em cada Plano
export function can(rolesRoutes: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userReq } = req;

    const userRepository = (await Database).getRepository(UserSchema);

    const user = await userRepository.findOne({
      where: { id: userReq.id },
      relations: {
        plan: {
          benefits: true,
        },
      },
    });

    if (!user) return res.status(400).json("User does not exists!");

    const benefitsRolesIsPermitted = user.plan.benefits
      .map((benefit) => benefit.role)
      .some((role) => rolesRoutes.includes(role));

    if (!benefitsRolesIsPermitted)
      return res
        .status(401)
        .json(
          `Unauthorized, This Plan ${user.plan.name} does not offer this permission!`,
        )
        .end();

    return next();
  };
}
