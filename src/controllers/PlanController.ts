import { Controller, Inject } from "@tsed/di";

import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";

import { Delete, Description, Get, Patch, Post, Required, Returns, Summary } from "@tsed/schema";

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
    async find(
        @Required()
        @PathParams("id")
        id: string,
    ): Promise<Plan | string | Error> {
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
    async create(
        @Required()
        @BodyParams(PlanModelDefinition)
        newPlanData: Plan,
    ): Promise<string | Error> {
        const newPlan = await this.service.create(newPlanData);

        return newPlan;
    }

    @Patch("/:id")
    @Summary("Atualiza um plano")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Plano não encontrado")
    @Returns(500).Description("Erro interno")
    async update(
        @Required()
        @PathParams()
        id: string,

        @Required()
        @BodyParams(PlanModelDefinition)
        newPlanData: Plan,
    ): Promise<string | Error> {
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

    @Patch("/:planID/:benefitID")
    @Summary("Adiciona um Benefício a um plano")
    @Returns(201, PlanModelDefinition).Description("OK").Examples("OK")
    @Returns(404).Description("Um dos itens não foi encontrado!")
    @Returns(500).Description("Erro interno do servidor")
    async patchBenefit(
        @PathParams("planID")
        planID: string,

        @PathParams("benefitID")
        benefitId: string,
    ): Promise<Plan | string | Error> {
        const result = await this.service.patchBenefit(planID, benefitId);

        return result;
    }

    @Delete("/:planID/:benefitID")
    @Summary("Remove um Benefício de um plano")
    @Returns(201, PlanModelDefinition).Description("OK").Examples("OK")
    @Returns(404).Description("Um dos itens não foi encontrado!")
    @Returns(500).Description("Erro interno do servidor")
    async deletePatchedBenefit(
        @PathParams("planID")
        planID: string,

        @PathParams("benefitID")
        benefitId: string,
    ): Promise<Plan | string | Error> {
        const result = await this.service.deletePatchedBenefit(planID, benefitId);

        return result;
    }

    @Patch("/:planID/:userID")
    @Summary("Adiciona um Usuário a um plano")
    @Returns(201, PlanModelDefinition).Description("OK").Examples("OK")
    @Returns(404).Description("Um dos itens não foi encontrado!")
    @Returns(500).Description("Erro interno do servidor")
    async patchUser(
        @PathParams("planID")
        planID: string,

        @PathParams("userID")
        userID: string,
    ): Promise<Plan | string | Error> {
        const result = await this.service.patchUserToPlan(planID, userID);

        return result;
    }

    @Delete("/:planID/:userID")
    @Summary("Remove um Usuário de um plano")
    @Returns(201, PlanModelDefinition).Description("OK").Examples("OK")
    @Returns(404).Description("Um dos itens não foi encontrado!")
    @Returns(500).Description("Erro interno do servidor")
    async deletePatchedUser(
        @PathParams("planID")
        planID: string,

        @PathParams("userID")
        userID: string,
    ): Promise<Plan | string | Error> {
        const result = await this.service.deletePatchedUser(planID, userID);

        return result;
    }
}
