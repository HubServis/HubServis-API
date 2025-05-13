import { Req } from "@tsed/platform-http";

import { Context } from "@tsed/platform-params";

import { Middleware, MiddlewareMethods } from "@tsed/platform-middlewares";

import { UserService } from "../services/UserService";

import { JWT_SECRET } from "../config/variables";

import { JwtPayload, sign, verify } from "jsonwebtoken";

import bcrypt from "bcrypt";

import { Unauthorized } from "@tsed/exceptions";

import { Benefit, Plan, User } from "../../generated/prisma";
import { UserDataDecodedType } from "../@types/AuthMiddleware";

@Middleware()
export class GenerateAccessJWT {
    private readonly userService = new UserService();

    public async use(@Req() req: Req, @Context() ctx: Context) {
        const authHeaders = req.headers["authorization"];

        const token = authHeaders && authHeaders.split(" ")[1];

        if (!token || token === null) {
            const userExists = await this.userService.find(req?.body?.email, false);

            if (userExists instanceof Error || typeof userExists === "string" || typeof userExists === "undefined")
                throw new Unauthorized("User não encontrado!");

            const autorized = bcrypt.compareSync(req?.body?.password, userExists.password);

            if (!autorized) throw new Unauthorized("Usuário não autorizado!");

            const user = await this.userService.find(req?.body?.email, true);

            const newToken = sign(
                {
                    user,
                },
                JWT_SECRET,
                { expiresIn: 2800 },
            );

            return ctx.set("token", newToken);
        }
    }
}

@Middleware()
export class ValidateAccessJWT implements MiddlewareMethods {
    public async use(@Req() req: Req, @Context() ctx: Context) {
        const options = ctx.endpoint.get(ValidateAccessJWT) || {};

        const authHeaders = req.headers["authorization"];

        const token = authHeaders && authHeaders.split(" ")[1];

        if (!token || token === null) throw new Unauthorized("Usuário não autorizado");

        const userDataDecoded = verify(token, JWT_SECRET, (err, decoded) => {
            if (err) throw new Unauthorized(`Error: ${err}`);

            return decoded;
        }) as UserDataDecodedType;

        if (!userDataDecoded) throw new Unauthorized("Não autorizado");

        let count = 0;

        if (options.plan && !options.plan.includes(userDataDecoded.user.plan.name)) count++;

        if (
            options.benefit &&
            !options.benefit.some((benefitOption: string) =>
                userDataDecoded.user.plan.benefits.some((benefit: Benefit) => benefit.name === benefitOption),
            )
        ) {
            count++;
        }

        if (count >= 2) throw new Unauthorized("Não autorizado");

        return true;
    }
}
