import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { Rating } from "../../generated/prisma";
import { prisma } from "./Prisma";

@Service()
export class RatingService {
    private readonly prisma = prisma

    async find(id: string): Promise<Rating | string | Error> {
        try {
            const rating = await this.prisma.rating.findUnique({
                where: { id },
            });

            if (!rating) return "Usuário não registrado.";

            return rating;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async findAll(): Promise<Rating[] | string | Error> {
        try {
            const ratings = await this.prisma.rating.findMany();

            if (ratings.length < 1) return "Não há usuários na base!";

            return ratings;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async create(newRatingData: Rating): Promise<string | Error> {
        try {
            const alreadyRegistered = await this.prisma.rating.findUnique({
                where: {
                    id: newRatingData.id,
                },
            });

            if (alreadyRegistered) return "Usuário já registrado!";

            await this.prisma.rating.create({
                data: newRatingData,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async update(newRatingData: Partial<Rating>, id: string): Promise<string | Error> {
        try {
            const rating = await this.prisma.rating.findUnique({
                where: { id },
            });

            if (!rating) return "Usuário não cadastrado!";

            const newRating = { ...rating, ...newRatingData };

            await this.prisma.rating.update({
                where: { id },
                data: newRating,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async delete(id: string): Promise<string | Error> {
        try {
            const rating = await this.prisma.rating.findUnique({
                where: { id },
            });

            if (!rating) return "Usuário não cadatrado";

            await this.prisma.rating.delete({
                where: { id },
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }
}
