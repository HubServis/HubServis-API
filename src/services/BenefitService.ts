import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { PrismaClient, Benefit } from "../../generated/prisma";

@Service()
export class BenefitService {
    private readonly prisma = new PrismaClient();

    async find(id: string): Promise<Benefit | string | Error> {
        try {
            const benefit = await this.prisma.benefit.findUnique({
                where: { id },
            });

            if (!benefit) return "Usuário não registrado.";

            return benefit;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async findAll(): Promise<Benefit[] | string | Error> {
        try {
            const benefits = await this.prisma.benefit.findMany();

            if (benefits.length < 1) return "Não há usuários na base!";

            return benefits;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async create(newBenefitData: Benefit): Promise<string | Error> {
        try {
            const alreadyRegistered = await this.prisma.benefit.findUnique({
                where: {
                    id: newBenefitData.id,
                },
            });

            if (alreadyRegistered) return "Usuário já registrado!";

            await this.prisma.benefit.create({
                data: newBenefitData,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async update(newBenefitData: Partial<Benefit>, id: string): Promise<string | Error> {
        try {
            const benefit = await this.prisma.benefit.findUnique({
                where: { id },
            });

            if (!benefit) return "Usuário não cadastrado!";

            const newBenefit = { ...benefit, ...newBenefitData };

            await this.prisma.benefit.update({
                where: { id },
                data: newBenefit,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async delete(id: string): Promise<string | Error> {
        try {
            const benefit = await this.prisma.benefit.findUnique({
                where: { id },
            });

            if (!benefit) return "Usuário não cadatrado";

            await this.prisma.benefit.delete({
                where: { id },
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }
}
