import { Controller, Inject } from "@tsed/di";

import { BodyParams, QueryParams } from "@tsed/platform-params";

import { Delete, Description, Get, Post, Put, Returns, Summary } from "@tsed/schema";

import { Schedule } from "../../generated/prisma";

import { ScheduleModelDefinition } from "../@types/modelDefinition";

import { ScheduleService } from "../services/ScheduleService";

@Controller("/schedules")
export class ScheduleController {
    @Inject()
    private readonly service: ScheduleService;

    @Get("/:id")
    @Summary("Busca um agendamento")
    @Description("Busca um agendamento com um plano ativo, deve ser usado um ID pra isso.")
    @Returns(200, ScheduleModelDefinition)
    @Returns(404).Description("Agendamento não registrado.")
    async find(@QueryParams() id: string): Promise<Schedule | string | Error> {
        const user = await this.service.find(id);

        return user;
    }

    @Get("/")
    @Summary("Busca todos os agendamentos")
    @Returns(200, Array).Of(ScheduleModelDefinition)
    @Returns(404).Description("Não há agendamentos na base!")
    async findAll(): Promise<Schedule[] | string | Error> {
        const users = await this.service.findAll();

        return users;
    }

    @Post("/")
    @Summary("Cria um novo agendamento")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(500).Description("Erro interno")
    async create(@BodyParams(ScheduleModelDefinition) newScheduleData: Schedule): Promise<string | Error> {
        const newSchedule = await this.service.create(newScheduleData);

        return newSchedule;
    }

    @Put("/:id")
    @Summary("Atualiza um agendamento")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Agendamento não encontrado")
    @Returns(500).Description("Erro interno")
    async update(@QueryParams() id: string, @BodyParams(ScheduleModelDefinition) newScheduleData: Schedule): Promise<string | Error> {
        const newSchedule = await this.service.update(newScheduleData, id);

        return newSchedule;
    }

    @Delete("/:id")
    @Summary("Remove um agendamento")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Agendamento não encontrado")
    @Returns(500).Description("Erro interno")
    async delete(@QueryParams() id: string): Promise<string | Error> {
        const result = await this.service.delete(id);

        return result;
    }
}
