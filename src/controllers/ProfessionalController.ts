import { Controller, Inject } from "@tsed/di";

import { BodyParams, QueryParams } from "@tsed/platform-params";

import { Delete, Description, Get, Post, Put, Returns, Summary } from "@tsed/schema";

import { Professional } from "../../generated/prisma";

import { ProfessionalModelDefinition } from "../@types/modelDefinition";

import { ProfessionalService } from "../services/ProfessionalService";

@Controller("/professional")
export class ProfessionalController {
    @Inject()
    private readonly service: ProfessionalService;

    @Get("/:id")
    @Summary("Busca um profissional")
    @Description("Busca um profissional com um plano ativo, deve ser usado um ID pra isso.")
    @Returns(200, ProfessionalModelDefinition)
    @Returns(404).Description("Profissional não registrada.")
    async find(@QueryParams() id: string): Promise<Professional | string | Error> {
        const user = await this.service.find(id);

        return user;
    }

    @Get("/")
    @Summary("Busca todos os profissionals")
    @Returns(200, Array).Of(ProfessionalModelDefinition)
    @Returns(404).Description("Não há profissionals na base!")
    async findAll(): Promise<Professional[] | string | Error> {
        const users = await this.service.findAll();

        return users;
    }

    @Post("/")
    @Summary("Cria um novo profissional")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(500).Description("Erro interno")
    async create(@BodyParams(ProfessionalModelDefinition) newProfessionalData: Professional): Promise<string | Error> {
        const newProfessional = await this.service.create(newProfessionalData);

        return newProfessional;
    }

    @Put("/:id")
    @Summary("Atualiza um profissional")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Profissional não encontrado")
    @Returns(500).Description("Erro interno")
    async update(
        @QueryParams() id: string,
        @BodyParams(ProfessionalModelDefinition) newProfessionalData: Professional,
    ): Promise<string | Error> {
        const newProfessional = await this.service.update(newProfessionalData, id);

        return newProfessional;
    }

    @Delete("/:id")
    @Summary("Remove um profissional")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Profissional não encontrado")
    @Returns(500).Description("Erro interno")
    async delete(@QueryParams() id: string): Promise<string | Error> {
        const result = await this.service.delete(id);

        return result;
    }
}
