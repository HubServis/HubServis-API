import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { Professional } from "../../generated/prisma";
import { prisma } from "./Prisma";

@Service()
export class ProfessionalService {
    private readonly prisma = prisma
    

    async find(id: string): Promise<Professional | string | Error> {
        try {
            const professional = await this.prisma.professional.findUnique({
                where: { id },
            });

            if (!professional) return "Plano não registrado.";

            return professional;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async findAll(): Promise<Professional[] | string | Error> {
        try {
            const professionals = await this.prisma.professional.findMany();

            if (professionals.length < 1) return "Não há Planos na base!";

            return professionals;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async create(newProfessionalData: Professional): Promise<string | Error> {
        try {
            const alreadyRegistered = await this.prisma.professional.findUnique({
                where: {
                    cpfcnpj: newProfessionalData.cpfcnpj,
                },
            });

            if (alreadyRegistered) return "Plano já registrado!";

            await this.prisma.professional.create({
                data: newProfessionalData,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async update(newprofessionalData: Partial<Professional>, id: string): Promise<string | Error> {
        try {
            const professional = await this.prisma.professional.findUnique({
                where: { id },
            });

            if (!professional) return "Plano não cadastrado!";

            const newprofessional = { ...professional, ...newprofessionalData };

            await this.prisma.professional.update({
                where: { id },
                data: newprofessional,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async delete(id: string): Promise<string | Error> {
        try {
            const professional = await this.prisma.professional.findUnique({
                where: { id },
            });

            if (!professional) return "Plano não cadatrado";

            await this.prisma.professional.delete({
                where: { id },
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }
}
