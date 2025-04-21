import { Controller, Inject } from "@tsed/di";

import { BodyParams, QueryParams } from "@tsed/platform-params";

import { Delete, Description, Get, Post, Put, Returns, Summary } from "@tsed/schema";

import { User } from "../../generated/prisma";

import { UserModelDefinition } from "../@types/modelDefinition";

import { UserService } from "../services/UserService";

@Controller("/users")
export class UserController {
    @Inject()
    private readonly service: UserService;

    @Get("/:id")
    @Summary("Busca um usuário")
    @Description("Busca um usuário com um plano ativo, deve ser usado um ID pra isso.")
    @Returns(200, UserModelDefinition)
    @Returns(404).Description("Usuário não registrado.")
    async find(@QueryParams() id: string): Promise<User | string | Error> {
        const user = await this.service.find(id);

        return user;
    }

    @Get("/")
    @Summary("Busca todos os usuários")
    @Returns(200, Array).Of(UserModelDefinition)
    @Returns(404).Description("Não há usuários na base!")
    async findAll(): Promise<User[] | string | Error> {
        const users = await this.service.findAll();

        return users;
    }

    @Post("/")
    @Summary("Cria um novo usuário")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(500).Description("Erro interno")
    async create(@BodyParams(UserModelDefinition) newUserData: User): Promise<string | Error> {
        const newUser = await this.service.create(newUserData);

        return newUser;
    }

    @Put("/:id")
    @Summary("Atualiza um usuário")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Usuário não encontrado")
    @Returns(500).Description("Erro interno")
    async update(@QueryParams() id: string, @BodyParams(UserModelDefinition) newUserData: User): Promise<string | Error> {
        const newUser = await this.service.update(newUserData, id);

        return newUser;
    }

    @Delete("/:id")
    @Summary("Remove um usuário")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Usuário não encontrado")
    @Returns(500).Description("Erro interno")
    async delete(@QueryParams() id: string): Promise<string | Error> {
        const result = await this.service.delete(id);

        return result;
    }
}
