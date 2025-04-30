import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { Schedule } from "../../generated/prisma";
import { prisma } from "./Prisma";

@Service()
export class ScheduleService {
    private readonly prisma = prisma

    async find(id: string): Promise<Schedule | string | Error> {
        try {
            const schedule = await this.prisma.schedule.findUnique({
                where: { id },
            });

            if (!schedule) return "Agendamento não registrado.";

            return schedule;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async findAll(): Promise<Schedule[] | string | Error> {
        try {
            const schedules = await this.prisma.schedule.findMany();

            if (schedules.length < 1) return "Não há agendamentos na base!";

            return schedules;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async create(newScheduleData: Schedule): Promise<string | Error> {
        try {
            const alreadyRegistered = await this.prisma.schedule.findUnique({
                where: {
                    id: newScheduleData.id,
                },
            });

            if (alreadyRegistered) return "Agendamento já registrado!";

            await this.prisma.schedule.create({
                data: newScheduleData,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async update(newScheduleData: Partial<Schedule>, id: string): Promise<string | Error> {
        try {
            const schedule = await this.prisma.schedule.findUnique({
                where: { id },
            });

            if (!schedule) return "Agendamento não cadastrado!";

            const newSchedule = { ...schedule, ...newScheduleData };

            await this.prisma.schedule.update({
                where: { id },
                data: newSchedule,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async delete(id: string): Promise<string | Error> {
        try {
            const schedule = await this.prisma.schedule.findUnique({
                where: { id },
            });

            if (!schedule) return "Agendamento não cadatrado";

            await this.prisma.schedule.delete({
                where: { id },
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }
}
