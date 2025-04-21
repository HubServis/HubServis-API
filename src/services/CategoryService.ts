import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { PrismaClient, Category } from "../../generated/prisma";

@Service()
export class CategoryService {
    private readonly prisma = new PrismaClient();

    async find(id: string): Promise<Category | string | Error> {
        try {
            const category = await this.prisma.category.findUnique({
                where: { id },
            });

            if (!category) return "Categoria não registrado.";

            return category;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async findAll(): Promise<Category[] | string | Error> {
        try {
            const categorys = await this.prisma.category.findMany();

            if (categorys.length < 1) return "Não há categorias na base!";

            return categorys;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async create(newCategoryData: Category): Promise<string | Error> {
        try {
            const alreadyRegistered = await this.prisma.category.findUnique({
                where: {
                    id: newCategoryData.id,
                },
            });

            if (alreadyRegistered) return "Categoria já registrado!";

            await this.prisma.category.create({
                data: newCategoryData,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async update(newCategoryData: Partial<Category>, id: string): Promise<string | Error> {
        try {
            const category = await this.prisma.category.findUnique({
                where: { id },
            });

            if (!category) return "Categoria não cadastrado!";

            const newCategory = { ...category, ...newCategoryData };

            await this.prisma.category.update({
                where: { id },
                data: newCategory,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async delete(id: string): Promise<string | Error> {
        try {
            const category = await this.prisma.category.findUnique({
                where: { id },
            });

            if (!category) return "Categoria não cadatrado";

            await this.prisma.category.delete({
                where: { id },
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }
}
