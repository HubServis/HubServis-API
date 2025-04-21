import { Controller, Inject } from "@tsed/di";

import { BodyParams, QueryParams } from "@tsed/platform-params";

import { Delete, Description, Get, Post, Put, Returns, Summary } from "@tsed/schema";

import { Business } from "../../generated/prisma";

import { BusinessModelDefinition } from "../@types/modelDefinition";

import { BusinessService } from "../services/BusinessService";

@Controller("/business")
export class BusinessController {
    @Inject()
    private readonly service: BusinessService;

    @Get("/:id")
    @Summary("Busca um negócio")
    @Description("Busca um negócio com um plano ativo, deve ser usado um ID pra isso.")
    @Returns(200, BusinessModelDefinition)
    @Returns(404).Description("Categoria não registrada.")
    async find(@QueryParams() id: string): Promise<Business | string | Error> {
        const user = await this.service.find(id);

        return user;
    }

    @Get("/")
    @Summary("Busca todos os negócios")
    @Returns(200, Array).Of(BusinessModelDefinition)
    @Returns(404).Description("Não há negócios na base!")
    async findAll(): Promise<Business[] | string | Error> {
        const users = await this.service.findAll();

        return users;
    }

    @Post("/")
    @Summary("Cria um novo negócio")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(500).Description("Erro interno")
    async create(@BodyParams(BusinessModelDefinition) newBusinessData: Business): Promise<string | Error> {
        const newBusiness = await this.service.create(newBusinessData);

        return newBusiness;
    }

    @Put("/:id")
    @Summary("Atualiza um negócio")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Categoria não encontrado")
    @Returns(500).Description("Erro interno")
    async update(@QueryParams() id: string, @BodyParams(BusinessModelDefinition) newBusinessData: Business): Promise<string | Error> {
        const newBusiness = await this.service.update(newBusinessData, id);

        return newBusiness;
    }

    @Delete("/:id")
    @Summary("Remove um negócio")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Categoria não encontrado")
    @Returns(500).Description("Erro interno")
    async delete(@QueryParams() id: string): Promise<string | Error> {
        const result = await this.service.delete(id);

        return result;
    }
}
