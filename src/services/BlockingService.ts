import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { PrismaClient, Blocking } from "../../generated/prisma";

@Service()
export class BlockingService {
    private readonly prisma = new PrismaClient();

    async find(id: string): Promise<Blocking | string | Error> {
        try {
            const blocking = await this.prisma.blocking.findUnique({
                where: { id },
            });

            if (!blocking) return "Usuário não registrado.";

            return blocking;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async findAll(): Promise<Blocking[] | string | Error> {
        try {
            const blockings = await this.prisma.blocking.findMany();

            if (blockings.length < 1) return "Não há usuários na base!";

            return blockings;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async create(newBlockingData: Blocking): Promise<string | Error> {
        try {
            const alreadyRegistered = await this.prisma.blocking.findUnique({
                where: {
                    id: newBlockingData.id,
                },
            });

            if (alreadyRegistered) return "Usuário já registrado!";

            await this.prisma.blocking.create({
                data: newBlockingData,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async update(newBlockingData: Partial<Blocking>, id: string): Promise<string | Error> {
        try {
            const blocking = await this.prisma.blocking.findUnique({
                where: { id },
            });

            if (!blocking) return "Usuário não cadastrado!";

            const newBlocking = { ...blocking, ...newBlockingData };

            await this.prisma.blocking.update({
                where: { id },
                data: newBlocking,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async delete(id: string): Promise<string | Error> {
        try {
            const blocking = await this.prisma.blocking.findUnique({
                where: { id },
            });

            if (!blocking) return "Usuário não cadatrado";

            await this.prisma.blocking.delete({
                where: { id },
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }
}
