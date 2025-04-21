import { Controller, Inject } from "@tsed/di";

import { BodyParams, QueryParams } from "@tsed/platform-params";

import { Delete, Description, Get, Post, Put, Returns, Summary } from "@tsed/schema";

import { Category } from "../../generated/prisma";

import { CategoryModelDefinition } from "../@types/modelDefinition";

import { CategoryService } from "../services/CategoryService";

@Controller("/category")
export class CategoryController {
    @Inject()
    private readonly service: CategoryService;

    @Get("/:id")
    @Summary("Busca um categoria")
    @Description("Busca um categoria com um plano ativo, deve ser usado um ID pra isso.")
    @Returns(200, CategoryModelDefinition)
    @Returns(404).Description("Categoria não registrada.")
    async find(@QueryParams() id: string): Promise<Category | string | Error> {
        const user = await this.service.find(id);

        return user;
    }

    @Get("/")
    @Summary("Busca todos os categorias")
    @Returns(200, Array).Of(CategoryModelDefinition)
    @Returns(404).Description("Não há categorias na base!")
    async findAll(): Promise<Category[] | string | Error> {
        const users = await this.service.findAll();

        return users;
    }

    @Post("/")
    @Summary("Cria um novo categoria")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(500).Description("Erro interno")
    async create(@BodyParams(CategoryModelDefinition) newCategoryData: Category): Promise<string | Error> {
        const newCategory = await this.service.create(newCategoryData);

        return newCategory;
    }

    @Put("/:id")
    @Summary("Atualiza um categoria")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Categoria não encontrado")
    @Returns(500).Description("Erro interno")
    async update(@QueryParams() id: string, @BodyParams(CategoryModelDefinition) newCategoryData: Category): Promise<string | Error> {
        const newCategory = await this.service.update(newCategoryData, id);

        return newCategory;
    }

    @Delete("/:id")
    @Summary("Remove um categoria")
    @Returns(201, String).Description("OK").Examples("OK")
    @Returns(404).Description("Categoria não encontrado")
    @Returns(500).Description("Erro interno")
    async delete(@QueryParams() id: string): Promise<string | Error> {
        const result = await this.service.delete(id);

        return result;
    }
}
