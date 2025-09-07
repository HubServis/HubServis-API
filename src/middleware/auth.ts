import { Req } from "@tsed/platform-http";

import { Context } from "@tsed/platform-params";

import { Middleware, MiddlewareMethods } from "@tsed/platform-middlewares";

import { UserService } from "../services/UserService";

import { JWT_SECRET } from "../config/variables";

import { sign, verify } from "jsonwebtoken";

import bcrypt from "bcrypt";

import { InternalServerError, Unauthorized } from "@tsed/exceptions";

import { Benefit } from "../../generated/prisma";

import { OAuthUserDataDecodedType, UserDataDecodedType } from "../@types/authMiddleware";

import { OAuthService } from "../services/oAuthsService";

import { redisClient } from "../config/cache";

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
        }) as UserDataDecodedType | OAuthUserDataDecodedType;

        if (!userDataDecoded) throw new Unauthorized("Não autorizado");

        if (userDataDecoded.provider) {
            throw new Unauthorized("Não autorizado");
        }

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

@Middleware()
export class RefreshAccessJWT implements MiddlewareMethods {
    public async use(@Req() req: Req, @Context() ctx: Context) {
        const authHeaders = req.headers["authorization"];

        const token = authHeaders && authHeaders.split(" ")[1];

        if (!token || token === null) throw new Unauthorized("Usuário não autorizado");

        const userDataDecoded = verify(token, JWT_SECRET, (_, decoded) => decoded) as UserDataDecodedType;

        if (!userDataDecoded) throw new Unauthorized("Não autorizado");

        delete userDataDecoded?.iat;
        delete userDataDecoded?.exp;

        const newToken = sign(userDataDecoded, JWT_SECRET, { expiresIn: 2800 });

        ctx.set("token", newToken);

        return (req.headers["authorization"] = newToken);
    }
}

@Middleware()
export class OAuthGenerateJWT implements MiddlewareMethods {
    private readonly userService = new UserService();

    public async use(@Req() req: Req, @Context() ctx: Context) {
        const oAuthService = new OAuthService(req.query["provider"] as "google" | "facebook" | "github" | "linkedin");

        if (!req.url.includes("callback") && !req.query["code"] && !req.query["state"]) {
            const urlCall = await oAuthService.getUrl();

            if (urlCall instanceof Error) throw new InternalServerError(`Erro ao gerar URL ${urlCall}`);

            return ctx.response.redirect(204, urlCall);
        }

        const oldState = await redisClient.get(req.query["state"] as string);

        if (!oldState) throw new Unauthorized("Estado inválido ou expirado");

        const payload = await oAuthService.getToken(req.query["code"] as string);

        if (payload instanceof Error || !payload) throw new InternalServerError(`Error ao obter dados do usuário: ${payload}`);

        const user = await this.userService.find(payload.userData.email as string, false);

        if (user === "Usuário não registrado.") {
            await redisClient.del(req.query["state"] as string);

            const newToken = sign({ ...payload.userData, provider: req.query["code"] }, JWT_SECRET, {
                expiresIn: payload.token.expiry_date,
            });

            await redisClient.set(payload.userData.email as string, payload.token.refresh_token, "EX", payload.token.expiry_date);

            ctx.set("token", newToken);

            return (req.headers["authorization"] = newToken);
        } else {
            await redisClient.del(req.query["state"] as string);

            const newToken = sign({ user, provider: req.query["code"] }, JWT_SECRET, { expiresIn: payload.token.expiry_date });

            await redisClient.set(payload.userData.email as string, payload.token.refresh_token, "EX", payload.token.expiry_date);

            ctx.set("token", newToken);

            return (req.headers["authorization"] = newToken);
        }
    }
}

@Middleware()
export class OAuthValidateAccessJWT implements MiddlewareMethods {
    public async use(@Req() req: Req, @Context() ctx: Context) {
        const options = ctx.endpoint.get(OAuthValidateAccessJWT) || {};

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

@Middleware()
export class OAuthRefreshAccessJWT implements MiddlewareMethods {
    public async use(@Req() req: Req, @Context() ctx: Context) {
        const authHeaders = req.headers["authorization"];

        const token = authHeaders && authHeaders.split(" ")[1];

        if (!token || token === null) throw new Unauthorized("Usuário não autorizado");

        const userDataDecoded = verify(token, JWT_SECRET, (err, decoded) => {
            if (err?.name === "TokenExpiredError") {
                return decoded;
            } else {
                return false;
            }
        }) as OAuthUserDataDecodedType | false;

        if (userDataDecoded === false) ctx.next();

        if (!userDataDecoded) throw new Unauthorized("Não autorizado");

        if (userDataDecoded.exp) delete userDataDecoded?.iat;

        delete userDataDecoded?.exp;

        const refreshToken = await redisClient.get(userDataDecoded.user.email);

        if (!refreshToken) throw new Unauthorized("Token Invalido");

        const payload = await new OAuthService(userDataDecoded["provider"] as "google" | "facebook" | "github" | "linkedin").refreshToken(
            refreshToken,
        );

        if (payload instanceof Error || !payload) throw new InternalServerError(`Error ao obter dados do usuário: ${payload}`);

        const newToken = sign(userDataDecoded, JWT_SECRET, { expiresIn: payload.token.expiry_date });

        await redisClient.set(userDataDecoded.user.email, payload.token.refresh_token, "EX", payload.token.expiry_date);

        ctx.set("token", newToken);

        return (req.headers["authorization"] = newToken);
    }
}
