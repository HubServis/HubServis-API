import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { Expedient } from "../../generated/prisma";
import { prisma } from "./Prisma";

@Service()
export class ExpedientService {
    private readonly prisma = prisma

    async find(id: string): Promise<Expedient | string | Error> {
        try {
            const expedient = await this.prisma.expedient.findUnique({
                where: { id },
            });

            if (!expedient) return "Usuário não registrado.";

            return expedient;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async findAll(): Promise<Expedient[] | string | Error> {
        try {
            const expedients = await this.prisma.expedient.findMany();

            if (expedients.length < 1) return "Não há usuários na base!";

            return expedients;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async create(newExpedientData: Expedient): Promise<string | Error> {
        try {
            const alreadyRegistered = await this.prisma.expedient.findUnique({
                where: {
                    id: newExpedientData.id,
                },
            });

            if (alreadyRegistered) return "Usuário já registrado!";

            await this.prisma.expedient.create({
                data: newExpedientData,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async update(newExpedientData: Partial<Expedient>, id: string): Promise<string | Error> {
        try {
            const expedient = await this.prisma.expedient.findUnique({
                where: { id },
            });

            if (!expedient) return "Usuário não cadastrado!";

            const newExpedient = { ...expedient, ...newExpedientData };

            await this.prisma.expedient.update({
                where: { id },
                data: newExpedient,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async delete(id: string): Promise<string | Error> {
        try {
            const expedient = await this.prisma.expedient.findUnique({
                where: { id },
            });

            if (!expedient) return "Usuário não cadatrado";

            await this.prisma.expedient.delete({
                where: { id },
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }
}
