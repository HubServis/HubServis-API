import { Controller } from "@tsed/di";
import { UseBefore } from "@tsed/platform-middlewares";

import { BodyParams, Context } from "@tsed/platform-params";

import { Description, Post, Required, Returns, Summary } from "@tsed/schema";
import { AuthModelDefinition } from "../@types/modelDefinition";

import { GenerateAccessJWT } from "../middleware/auth";

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
}
