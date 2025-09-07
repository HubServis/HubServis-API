import { Controller, logger } from "@tsed/di";
import { UseBefore } from "@tsed/platform-middlewares";

import { BodyParams, Context, QueryParams } from "@tsed/platform-params";

import { Description, Get, Post, Required, Returns, Summary } from "@tsed/schema";
import { AuthModelDefinition } from "../@types/modelDefinition";

import { GenerateAccessJWT, OAuthGenerateAccessJWT } from "../middleware/auth";

@Controller("/auth")
export class AuthController {
    @Post("/")
    @Summary("Autenticação")
    @Description("Inicializa uma autenticação pra um usuário cadastrado")
    @Returns(200)
    @Returns(401).Description("UNAUTHORIZED")
    @UseBefore(GenerateAccessJWT)
    public async sign(
        @Required()
        @BodyParams(AuthModelDefinition)
        _body: { email: string; password: string },

        @Context()
        ctx: Context,
    ) {
        return JSON.stringify({ token: ctx.get("token") });
    }

    @Get("/oauth")
    @Summary("Autenticação OAuth")
    @Description("Inicializa uma autenticação pra um usuário via Google Auth")
    @Returns(200)
    @Returns(401).Description("UNAUTHORIZED")
    @UseBefore(OAuthGenerateAccessJWT)
    public async signOauth() {
        return;
    }

    @Get("/oauth/callback")
    @Description("Retorno da chamada OAuth")
    @Returns(200)
    @Returns(401).Description("UNAUTHORIZED")
    @UseBefore(OAuthGenerateAccessJWT)
    public async callbackOauth(@QueryParams("provider") provider: string) {
        logger().info(`Callback recebido ${provider}`);

        return;
    }
}
