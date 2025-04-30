import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { Business } from "../../generated/prisma";
import { prisma } from "./Prisma";

@Service()
export class BusinessService {
    private readonly prisma = prisma

    async find(id: string): Promise<Business | string | Error> {
        try {
            const business = await this.prisma.business.findUnique({
                where: { id },
            });

            if (!business) return "Usuário não registrado.";

            return business;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async findAll(): Promise<Business[] | string | Error> {
        try {
            const businesss = await this.prisma.business.findMany();

            if (businesss.length < 1) return "Não há usuários na base!";

            return businesss;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async create(newBusinessData: Business): Promise<string | Error> {
        try {
            const alreadyRegistered = await this.prisma.business.findUnique({
                where: {
                    id: newBusinessData.id,
                },
            });

            if (alreadyRegistered) return "Usuário já registrado!";

            await this.prisma.business.create({
                data: newBusinessData,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async update(newBusinessData: Partial<Business>, id: string): Promise<string | Error> {
        try {
            const business = await this.prisma.business.findUnique({
                where: { id },
            });

            if (!business) return "Usuário não cadastrado!";

            const newBusiness = { ...business, ...newBusinessData };

            await this.prisma.business.update({
                where: { id },
                data: newBusiness,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async delete(id: string): Promise<string | Error> {
        try {
            const business = await this.prisma.business.findUnique({
                where: { id },
            });

            if (!business) return "Usuário não cadatrado";

            await this.prisma.business.delete({
                where: { id },
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }
}
