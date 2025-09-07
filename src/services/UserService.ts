import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { User } from "../../generated/prisma";

import bcrypt from "bcrypt";

import { prisma } from "./Prisma";
import { BusinessUser } from "../@types/dataTypes";

@Service()
export class UserService {
    private readonly prisma = prisma;

    async find<TOmit extends boolean>(email: string, omit?: TOmit) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email },
                omit: {
                    password: omit,
                },
                include: {
                    business: true,
                    plan: {
                        include: {
                            benefits: true,
                        },
                    },
                },
            });

            if (!user) return "Usuário não registrado.";

            return user;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async findAll(): Promise<Omit<User, "password">[] | string | Error> {
        try {
            const users = await this.prisma.user.findMany({
                omit: {
                    password: true,
                },
                include: {
                    plan: {
                        include: {
                            benefits: true,
                        },
                    },
                    business: true,
                },
            });

            if (users.length < 1) return "Não há usuários na base!";

            return users;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async createClient(newUserData: User): Promise<Partial<User> | string | Error> {
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
                    email: newUserData.email,
                    name: newUserData.name,
                    phone: newUserData.phone,
                    password: newUserData.password,
                },
                include: {
                    business: false,
                    plan: false,
                },
                omit: {
                    password: true,
                },
            });

            return newUser;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async createOwner(newUserData: BusinessUser): Promise<Partial<User> | string | Error> {
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
                    email: newUserData.email,
                    name: newUserData.name,
                    password: newUserData.password,
                    cpfcnpj: newUserData.cpfcnpj,
                    phone: newUserData.phone,
                    plan: {
                        connect: {
                            id: newUserData.planId!,
                        },
                    },
                    business: {
                        create: {
                            name: newUserData.business.name,
                            businessType: newUserData.business.businessType,
                        },
                    },
                },
                include: {
                    business: true,
                    plan: true,
                },
                omit: {
                    password: true,
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
