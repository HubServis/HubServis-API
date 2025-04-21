import { Controller, Inject } from "@tsed/di";

import { BodyParams, QueryParams } from "@tsed/platform-params";

import { Delete, Description, Get, Post, Put, Returns, Summary } from "@tsed/schema";

import { Role } from "../../generated/prisma";

import { RoleModelDefinition } from "../@types/modelDefinition";

import { RoleService } from "../services/RoleService";

@Controller("/role")
export class RoleController {
    @Inject()
    private readonly service: RoleService;

    @Get("/:id")
    @Summary("Busca um cargo")
    @Description("Busca um cargo com um plano ativo, deve ser usado um ID pra isso.")
    @Returns(200, RoleModelDefinition)
    @Returns(404).Description("Cargo não registrada.")
    async find(@QueryParams() id: string): Promise<Role | string | Error> {
        const user = await this.service.find(id);

        return user;
    }

    @Get("/")
    @Summary("Busca todos os cargos")
    @Returns(200, Array).Of(RoleModelDefinition)
    @Returns(404).Description("Não há cargos na base!")
    async findAll(): Promise<Role[] | string | Error> {
        const users = await this.service.findAll();

        return users;
    }

    @Post("/")
    @Summary("Cria um novo cargo")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(500).Description("Erro interno")
    async create(@BodyParams(RoleModelDefinition) newRoleData: Role): Promise<string | Error> {
        console.log("Controller", newRoleData);

        const newRole = await this.service.create(newRoleData);

        return newRole;
    }

    @Put("/:id")
    @Summary("Atualiza um cargo")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Cargo não encontrado")
    @Returns(500).Description("Erro interno")
    async update(@QueryParams() id: string, @BodyParams(RoleModelDefinition) newRoleData: Role): Promise<string | Error> {
        const newRole = await this.service.update(newRoleData, id);

        return newRole;
    }

    @Delete("/:id")
    @Summary("Remove um cargo")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Cargo não encontrado")
    @Returns(500).Description("Erro interno")
    async delete(@QueryParams() id: string): Promise<string | Error> {
        const result = await this.service.delete(id);

        return result;
    }
}
