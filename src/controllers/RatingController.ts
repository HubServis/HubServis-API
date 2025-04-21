import { Controller, Inject } from "@tsed/di";

import { BodyParams, QueryParams } from "@tsed/platform-params";

import { Delete, Description, Get, Post, Put, Returns, Summary } from "@tsed/schema";

import { Rating } from "../../generated/prisma";

import { RatingModelDefinition } from "../@types/modelDefinition";

import { RatingService } from "../services/RatingService";

@Controller("/rating")
export class RatingController {
    @Inject()
    private readonly service: RatingService;

    @Get("/:id")
    @Summary("Busca um rating")
    @Description("Busca um rating com um plano ativo, deve ser usado um ID pra isso.")
    @Returns(200, RatingModelDefinition)
    @Returns(404).Description("Rating não registrada.")
    async find(@QueryParams() id: string): Promise<Rating | string | Error> {
        const user = await this.service.find(id);

        return user;
    }

    @Get("/")
    @Summary("Busca todos os ratings")
    @Returns(200, Array).Of(RatingModelDefinition)
    @Returns(404).Description("Não há ratings na base!")
    async findAll(): Promise<Rating[] | string | Error> {
        const users = await this.service.findAll();

        return users;
    }

    @Post("/")
    @Summary("Cria um novo rating")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(500).Description("Erro interno")
    async create(@BodyParams(RatingModelDefinition) newRatingData: Rating): Promise<string | Error> {
        const newRating = await this.service.create(newRatingData);

        return newRating;
    }

    @Put("/:id")
    @Summary("Atualiza um rating")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Rating não encontrado")
    @Returns(500).Description("Erro interno")
    async update(@QueryParams() id: string, @BodyParams(RatingModelDefinition) newRatingData: Rating): Promise<string | Error> {
        const newRating = await this.service.update(newRatingData, id);

        return newRating;
    }

    @Delete("/:id")
    @Summary("Remove um rating")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Rating não encontrado")
    @Returns(500).Description("Erro interno")
    async delete(@QueryParams() id: string): Promise<string | Error> {
        const result = await this.service.delete(id);

        return result;
    }
}
