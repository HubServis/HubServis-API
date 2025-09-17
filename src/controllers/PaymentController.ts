import { Controller, Inject } from "@tsed/di";

import { BodyParams, QueryParams } from "@tsed/platform-params";

import { stripeBody } from "../@types/controllerDefinitions";

import { Description, Post, Returns, Summary } from "@tsed/schema";

import { PaymentService } from "../services/PaymentService";

import { redisClient } from "../config/cache";
import { InternalServerError } from "@tsed/exceptions";

@Controller("/payments")
export class PaymentController {
    @Inject()
    private readonly service: PaymentService;

    @Post("/webhook")
    @Summary("Webhook gate")
    @Description("Usado para receber posts da API de webhook")
    @Returns(200)
    @Returns(400)
    async handler(@BodyParams() body: stripeBody, @QueryParams() params: any) {
        console.log(body, params);

        if (body.request.idempotency_key && body.request.id) {
            const alreadycalled = await redisClient.get(body.request.idempotency_key);

            if (!alreadycalled) {
                const cache = await redisClient.set(body.request.idempotency_key, body.request.id, "EX", 200);

                if (cache !== "OK") {
                    throw new InternalServerError("Erro ao salvar cache!");
                }
            } else return;
        }

        return;
    }
}
