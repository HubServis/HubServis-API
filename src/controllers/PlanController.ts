import { Controller, Inject } from "@tsed/di";

import { BodyParams, QueryParams } from "@tsed/platform-params";

import { Delete, Description, Get, Post, Put, Returns, Summary } from "@tsed/schema";

import { Plan } from "../../generated/prisma";

import { PlanModelDefinition } from "../@types/modelDefinition";

import { PlanService } from "../services/PlanService";

@Controller("/plan")
export class PlanController {
    @Inject()
    private readonly service: PlanService;

    @Get("/:id")
    @Summary("Busca um plano")
    @Description("Busca um plano com um plano ativo, deve ser usado um ID pra isso.")
    @Returns(200, PlanModelDefinition)
    @Returns(404).Description("Plano não registrada.")
    async find(@QueryParams() id: string): Promise<Plan | string | Error> {
        const user = await this.service.find(id);

        return user;
    }

    @Get("/")
    @Summary("Busca todos os planos")
    @Returns(200, Array).Of(PlanModelDefinition)
    @Returns(404).Description("Não há planos na base!")
    async findAll(): Promise<Plan[] | string | Error> {
        const users = await this.service.findAll();

        return users;
    }

    @Post("/")
    @Summary("Cria um novo plano")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(500).Description("Erro interno")
    async create(@BodyParams(PlanModelDefinition) newPlanData: Plan): Promise<string | Error> {
        const newPlan = await this.service.create(newPlanData);

        return newPlan;
    }

    @Put("/:id")
    @Summary("Atualiza um plano")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Plano não encontrado")
    @Returns(500).Description("Erro interno")
    async update(@QueryParams() id: string, @BodyParams(PlanModelDefinition) newPlanData: Plan): Promise<string | Error> {
        const newPlan = await this.service.update(newPlanData, id);

        return newPlan;
    }

    @Delete("/:id")
    @Summary("Remove um plano")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Plano não encontrado")
    @Returns(500).Description("Erro interno")
    async delete(@QueryParams() id: string): Promise<string | Error> {
        const result = await this.service.delete(id);

        return result;
    }
}
