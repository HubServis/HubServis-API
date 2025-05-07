import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { User } from "../../generated/prisma";

import bcrypt from "bcrypt";

import { prisma } from "./Prisma";

@Service()
export class UserService {
    private readonly prisma = prisma;

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
            const users = await this.prisma.user.findMany({
                include: {
                    plan: true,
                    bussines: true,
                },
            });

            if (users.length < 1) return "Não há usuários na base!";

            return users;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async create(newUserData: User): Promise<User | string | Error> {
        try {
            const alreadyRegistered = await this.prisma.user.findUnique({
                where: {
                    email: newUserData.email,
                },
            });

            if (alreadyRegistered) return "Usuário já registrado!";

            const salt = bcrypt.genSaltSync(10);

            newUserData.password = bcrypt.hashSync(newUserData.password, salt);

            const newUser = await this.prisma.user.create({
                data: {
                    username: newUserData.username,
                    password: newUserData.password,
                    cpfcnpj: newUserData.cpfcnpj,
                    email: newUserData.email,
                    name: newUserData.name,
                    plan: {
                        connect: {
                            id: newUserData.planId,
                        },
                    },
                },
                include: {
                    bussines: true,
                    plan: true,
                },
            });

            return newUser;
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
