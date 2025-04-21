import { Controller, Inject } from "@tsed/di";

import { BodyParams, QueryParams } from "@tsed/platform-params";

import { Delete, Description, Get, Post, Put, Returns, Summary } from "@tsed/schema";

import { Expedient } from "../../generated/prisma";

import { ExpedientModelDefinition } from "../@types/modelDefinition";

import { ExpedientService } from "../services/ExpedientService";

@Controller("/expedient")
export class ExpedientController {
    @Inject()
    private readonly service: ExpedientService;

    @Get("/:id")
    @Summary("Busca um expediente")
    @Description("Busca um expediente com um plano ativo, deve ser usado um ID pra isso.")
    @Returns(200, ExpedientModelDefinition)
    @Returns(404).Description("Expediente não registrada.")
    async find(@QueryParams() id: string): Promise<Expedient | string | Error> {
        const user = await this.service.find(id);

        return user;
    }

    @Get("/")
    @Summary("Busca todos os expedientes")
    @Returns(200, Array).Of(ExpedientModelDefinition)
    @Returns(404).Description("Não há expedientes na base!")
    async findAll(): Promise<Expedient[] | string | Error> {
        const users = await this.service.findAll();

        return users;
    }

    @Post("/")
    @Summary("Cria um novo expediente")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(500).Description("Erro interno")
    async create(@BodyParams(ExpedientModelDefinition) newExpedientData: Expedient): Promise<string | Error> {
        const newExpedient = await this.service.create(newExpedientData);

        return newExpedient;
    }

    @Put("/:id")
    @Summary("Atualiza um expediente")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Expediente não encontrado")
    @Returns(500).Description("Erro interno")
    async update(@QueryParams() id: string, @BodyParams(ExpedientModelDefinition) newExpedientData: Expedient): Promise<string | Error> {
        const newExpedient = await this.service.update(newExpedientData, id);

        return newExpedient;
    }

    @Delete("/:id")
    @Summary("Remove um expediente")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Expediente não encontrado")
    @Returns(500).Description("Erro interno")
    async delete(@QueryParams() id: string): Promise<string | Error> {
        const result = await this.service.delete(id);

        return result;
    }
}
