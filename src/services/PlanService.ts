import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { Plan, PrismaClient } from "../../generated/prisma";

@Service()
export class PlanService {
    private readonly prisma = new PrismaClient();

    async find(id: string): Promise<Plan | string | Error> {
        try {
            const plan = await this.prisma.plan.findUnique({
                where: { id },
            });

            if (!plan) return "Plano não registrado.";

            return plan;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async findAll(): Promise<Plan[] | string | Error> {
        try {
            const plans = await this.prisma.plan.findMany();

            if (plans.length < 1) return "Não há usuários na base!";

            return plans;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async create(newPlanData: Plan): Promise<string | Error> {
        try {
            const alreadyRegistered = await this.prisma.plan.findUnique({
                where: {
                    id: newPlanData.id,
                },
            });

            if (alreadyRegistered) return "Plano já registrado!";

            await this.prisma.plan.create({
                data: newPlanData,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async update(newUserData: Partial<Plan>, id: string): Promise<string | Error> {
        try {
            const plan = await this.prisma.plan.findUnique({
                where: { id },
            });

            if (!plan) return "Plano não cadastrado!";

            const newUser = { ...plan, ...newUserData };

            await this.prisma.plan.update({
                where: { id },
                data: newUser,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async delete(id: string): Promise<string | Error> {
        try {
            const plan = await this.prisma.plan.findUnique({
                where: { id },
            });

            if (!plan) return "Plano não cadatrado";

            await this.prisma.plan.delete({
                where: { id },
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }
}
