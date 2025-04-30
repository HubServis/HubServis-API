import { Controller, Inject } from "@tsed/di";

import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";

import { Delete, Description, Get, Post, Put, Returns, Summary } from "@tsed/schema";

import { Benefit } from "../../generated/prisma";

import { BenefitModelDefinition } from "../@types/modelDefinition";

import { BenefitService } from "../services/BenefitService";

@Controller("/benefits")
export class BenefitController {
    @Inject()
    private readonly service: BenefitService;

    @Get("/:id")
    @Summary("Busca um benefício")
    @Description("Busca um benefício com um plano ativo, deve ser usado um ID pra isso.")
    @Returns(200, BenefitModelDefinition)
    @Returns(404).Description("Agendamento não registrado.")
    async find(@QueryParams() id: string): Promise<Benefit | string | Error> {
        const user = await this.service.find(id);

        return user;
    }

    @Get("/")
    @Summary("Busca todos os benefícios")
    @Returns(200, Array).Of(BenefitModelDefinition)
    @Returns(404).Description("Não há benefícios na base!")
    async findAll(): Promise<Benefit[] | string | Error> {
        const users = await this.service.findAll();

        return users;
    }

    @Post("/")
    @Summary("Cria um novo benefício")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(500).Description("Erro interno")
    async create(@BodyParams(BenefitModelDefinition) newBenefitData: Benefit): Promise<string | Error> {
        const newBenefit = await this.service.create(newBenefitData);

        return newBenefit;
    }

    @Put("/:id")
    @Summary("Atualiza um benefício")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Agendamento não encontrado")
    @Returns(500).Description("Erro interno")
    async update(
        @PathParams("id") id: string,
        @BodyParams(BenefitModelDefinition) newBenefitData: Partial<Benefit>,
    ): Promise<string | Error> {
        const newBenefit = await this.service.update(newBenefitData, id);

        return newBenefit;
    }

    @Delete("/:id")
    @Summary("Remove um benefício")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Agendamento não encontrado")
    @Returns(500).Description("Erro interno")
    async delete(@QueryParams() id: string): Promise<string | Error> {
        const result = await this.service.delete(id);

        return result;
    }
}
