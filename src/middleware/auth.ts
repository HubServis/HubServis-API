import { Req } from "@tsed/platform-http";

import { Context } from "@tsed/platform-params";

import { Middleware } from "@tsed/platform-middlewares";

import { UserService } from "../services/UserService";

import { User } from "../../generated/prisma";

import { JWT_SECRET } from "../config/variables";

import { sign } from "jsonwebtoken";

import bcrypt from "bcrypt";

import { Unauthorized } from "@tsed/exceptions";

@Middleware()
export class GenerateAccessJWT {
    private readonly userService = new UserService();

    public async use(@Req() req: Req, @Context() ctx: Context) {
        const authHeaders = req.headers["authorization"];

        const token = authHeaders && authHeaders.split(" ")[1];

        if (!token || token === null) {
            const userExists: User | Error | string = await this.userService.find(req?.body?.email);

            if (userExists instanceof Error || typeof userExists === "string") throw new Unauthorized("User não encontrado!");

            if (bcrypt.compareSync(req?.body?.password, userExists.password)) throw new Unauthorized("Unauthorized");

            const newToken = sign(
                {
                    userExists,
                },
                JWT_SECRET,
                { expiresIn: 2800 },
            );

            return ctx.set("token", newToken);
        }
    }
}
