import { Controller, Inject } from "@tsed/di";

import { BodyParams, QueryParams } from "@tsed/platform-params";

import { Delete, Description, Get, Post, Put, Returns, Summary } from "@tsed/schema";

import { Blocking } from "../../generated/prisma";

import { BlockingModelDefinition } from "../@types/modelDefinition";

import { BlockingService } from "../services/BlockingService";

@Controller("/blocking")
export class BlockingController {
    @Inject()
    private readonly service: BlockingService;

    @Get("/:id")
    @Summary("Busca um bloqueio")
    @Description("Busca um bloqueio com um plano ativo, deve ser usado um ID pra isso.")
    @Returns(200, BlockingModelDefinition)
    @Returns(404).Description("Bloqueio não registrada.")
    async find(@QueryParams() id: string): Promise<Blocking | string | Error> {
        const user = await this.service.find(id);

        return user;
    }

    @Get("/")
    @Summary("Busca todos os bloqueios")
    @Returns(200, Array).Of(BlockingModelDefinition)
    @Returns(404).Description("Não há bloqueios na base!")
    async findAll(): Promise<Blocking[] | string | Error> {
        const users = await this.service.findAll();

        return users;
    }

    @Post("/")
    @Summary("Cria um novo bloqueio")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(500).Description("Erro interno")
    async create(@BodyParams(BlockingModelDefinition) newBlockingData: Blocking): Promise<string | Error> {
        const newBlocking = await this.service.create(newBlockingData);

        return newBlocking;
    }

    @Put("/:id")
    @Summary("Atualiza um bloqueio")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Bloqueio não encontrado")
    @Returns(500).Description("Erro interno")
    async update(@QueryParams() id: string, @BodyParams(BlockingModelDefinition) newBlockingData: Blocking): Promise<string | Error> {
        const newBlocking = await this.service.update(newBlockingData, id);

        return newBlocking;
    }

    @Delete("/:id")
    @Summary("Remove um bloqueio")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Bloqueio não encontrado")
    @Returns(500).Description("Erro interno")
    async delete(@QueryParams() id: string): Promise<string | Error> {
        const result = await this.service.delete(id);

        return result;
    }
}
