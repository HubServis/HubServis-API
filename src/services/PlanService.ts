import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { UserService } from "./UserService";
import { BenefitService } from "./BenefitService";

import { Plan } from "../../generated/prisma";
import { prisma } from "./Prisma";

@Service()
export class PlanService {
    private readonly prisma = prisma;
    private readonly userService = new UserService();
    private readonly benefitService = new BenefitService();

    async find(id: string): Promise<Plan | string | Error> {
        try {
            const plan = await this.prisma.plan.findUnique({
                where: { id },
                include: {
                    users: {
                        select: {
                            name: true,
                            cpfcnpj: true,
                        },
                    },
                    benefits: true,
                },
            });

            if (!plan) return "Plano não registrado.";

            return plan;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async findAll(): Promise<Plan[] | string | Error> {
        try {
            const plans = await this.prisma.plan.findMany({
                include: {
                    users: {
                        select: {
                            name: true,
                            cpfcnpj: true,
                            email: true,
                        },
                    },
                    _count: true,
                    benefits: true,
                },
            });

            if (plans.length < 1) return "Não há Planos na base!";

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

    async update(newPlanData: Partial<Plan>, id: string): Promise<string | Error> {
        try {
            const plan = await this.prisma.plan.findUnique({
                where: { id },
            });

            if (!plan) return "Plano não cadastrado!";

            const newPlan = { ...plan, ...newPlanData };

            await this.prisma.plan.update({
                where: { id },
                data: newPlan,
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

    async patchBenefit(planID: string, benefitID: string): Promise<Plan | string | Error> {
        try {
            const plan = await this.prisma.plan.findUnique({
                where: { id: planID },
            });

            if (!plan) return "Plano não cadastrado!";

            const benefit = await this.benefitService.find(benefitID);

            if (!benefit || benefit instanceof Error) return "Benefícios não cadastrado!";

            const newPlan = await this.prisma.plan.update({
                where: { id: planID },
                data: {
                    benefits: {
                        connect: {
                            id: benefitID,
                        },
                    },
                },
                include: {
                    benefits: true,
                },
            });

            return newPlan;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async deletePatchedBenefit(planID: string, benefitID: string): Promise<Plan | string | Error> {
        try {
            const plan = await this.prisma.plan.findUnique({
                where: { id: planID },
            });

            if (!plan) return "Plano não cadastrado!";

            const newPlan = await this.prisma.plan.update({
                where: { id: planID },
                data: {
                    benefits: {
                        disconnect: {
                            id: benefitID,
                        },
                    },
                },
                include: {
                    benefits: true,
                },
            });

            return newPlan;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async patchUserToPlan(planID: string, userID: string): Promise<Plan | string | Error> {
        try {
            const plan = await this.prisma.plan.findUnique({
                where: { id: planID },
            });

            if (!plan) return "Plano não cadastrado!";

            const user = await this.userService.find(userID);

            if (!user || user instanceof Error) return "Usuário não cadastrado!";

            const newPlan = await this.prisma.plan.update({
                where: { id: planID },
                data: {
                    users: {
                        connect: {
                            id: userID,
                        },
                    },
                },
                include: {
                    users: {
                        select: {
                            name: true,
                            cpfcnpj: true,
                        },
                    },
                },
            });

            return newPlan;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async deletePatchedUser(planID: string, userID: string): Promise<Plan | string | Error> {
        try {
            const plan = await this.prisma.plan.findUnique({
                where: { id: planID },
            });

            if (!plan) return "Plano não cadastrado!";

            const newPlan = await this.prisma.plan.update({
                where: { id: planID },
                data: {
                    users: {
                        disconnect: {
                            id: userID,
                        },
                    },
                },
                include: {
                    users: {
                        select: {
                            name: true,
                            cpfcnpj: true,
                        },
                    },
                },
            });

            return newPlan;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }
}
