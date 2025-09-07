import { Controller, Inject } from "@tsed/di";
import { UseAuth } from "@tsed/platform-middlewares";

import { BodyParams, PathParams } from "@tsed/platform-params";

import { Delete, Description, Get, Groups, In, Post, Put, Returns, Security, Summary } from "@tsed/schema";

import { User } from "../../generated/prisma";
import { BusinessUser } from "../@types/dataTypes";

import { UserModelDefinition } from "../@types/modelDefinition";
import { ValidateAccessJWT } from "../middleware/auth";

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
    async find(@PathParams("id") id: string): Promise<Partial<User> | string | Error> {
        const user = await this.service.find(id, true);

        return user;
    }

    @Get("/all")
    @Summary("Busca todos os usuários")
    @Returns(200, Array).Of(UserModelDefinition)
    @Returns(404).Description("Não há usuários na base!")
    async findAll(): Promise<Omit<User, "password">[] | string | Error> {
        const users = await this.service.findAll();

        return users;
    }

    @Post("/client")
    @Summary("Registra um novo cliente")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(500).Description("Erro interno")
    async createClient(@BodyParams(UserModelDefinition) newUserData: User): Promise<Partial<User> | string | Error> {
        const newUser = await this.service.createClient(newUserData);

        return newUser;
    }

    @Post("/owner")
    @Summary("Registra um novo cliente")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(500).Description("Erro interno")
    async createOwner(
        @BodyParams(UserModelDefinition) @Groups("createOwner") newUserData: BusinessUser,
    ): Promise<Partial<User> | string | Error> {
        const newUser = await this.service.createOwner(newUserData);

        return newUser;
    }

    @Put("/:id")
    @Summary("Atualiza um usuário")
    @UseAuth(ValidateAccessJWT, { plan: ["Free", "Pro", "Enterprise", "Abaco"], benefit: ["updateOwn", "teste"] })
    @Security("bearerHttpAuthentication")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Usuário não encontrado")
    @Returns(500).Description("Erro interno")
    async update(@PathParams("id") id: string, @BodyParams(UserModelDefinition) newUserData: User): Promise<string | Error> {
        const newUser = await this.service.update(newUserData, id);

        return newUser;
    }

    @Delete("/:id")
    @Summary("Remove um usuário")
    @In("header").Name("authorization").Type(String).Description("Bearer Auth Required")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Usuário não encontrado")
    @Returns(500).Description("Erro interno")
    async delete(@PathParams("id") id: string): Promise<string | Error> {
        const result = await this.service.delete(id);

        return result;
    }
}
