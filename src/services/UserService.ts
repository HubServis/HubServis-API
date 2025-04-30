import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { User } from "../../generated/prisma";
import { prisma } from "./Prisma";

@Service()
export class UserService {
    private readonly prisma = prisma

    async find(email: string): Promise<User | string | Error> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email },
                include: {
                    bussines: true,
                    plan: true,
                },
            });

            if (!user) return "Usuário não registrado.";

            return user;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async findAll(): Promise<User[] | string | Error> {
        try {
            const users = await this.prisma.user.findMany();

            if (users.length < 1) return "Não há usuários na base!";

            return users;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async create(newUserData: User): Promise<string | Error> {
        try {
            const alreadyRegistered = await this.prisma.user.findUnique({
                where: {
                    email: newUserData.email,
                },
            });

            if (alreadyRegistered) return "Usuário já registrado!";

            const newUser = await this.prisma.user.create({
                data: newUserData,
                include: {
                    bussines: true,
                    plan: true,
                },
            });

            return `OK: ${newUser}`;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async update(newUserData: Partial<User>, id: string): Promise<string | Error> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });

            if (!user) return "Usuário não cadastrado!";

            const newUser = { ...user, ...newUserData };

            await this.prisma.user.update({
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
            const user = await this.prisma.user.findUnique({
                where: { id },
            });

            if (!user) return "Usuário não cadatrado";

            await this.prisma.user.delete({
                where: { id },
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }
}
