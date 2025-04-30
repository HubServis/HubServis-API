import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { Role } from "../../generated/prisma";
import { prisma } from "./Prisma";

@Service()
export class RoleService {
    private readonly prisma = prisma

    async find(id: string): Promise<Role | string | Error> {
        try {
            const role = await this.prisma.role.findUnique({
                where: { id },
            });

            if (!role) return "Role não registrado.";

            return role;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async findAll(): Promise<Role[] | string | Error> {
        try {
            const roles = await this.prisma.role.findMany();

            if (roles.length < 1) return "Não há roles na base!";

            return roles;
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async create(newRoleData: Role): Promise<string | Error> {
        try {
            const alreadyRegistered = await this.prisma.role.findUnique({
                where: {
                    name: newRoleData.name.trim().toLowerCase(),
                },
            });

            if (alreadyRegistered?.name.toLowerCase().trim() === newRoleData.name.toLowerCase().trim()) return "Role já registrado!";

            await this.prisma.role.create({
                data: { ...newRoleData, name: newRoleData.name.trim().toLowerCase() },
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async update(newRoleData: Partial<Role>, id: string): Promise<string | Error> {
        try {
            const role = await this.prisma.role.findUnique({
                where: { id },
            });

            if (!role) return "Role não cadastrado!";

            const newRole = { ...role, ...newRoleData };

            await this.prisma.role.update({
                where: { id },
                data: newRole,
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    async delete(id: string): Promise<string | Error> {
        try {
            const role = await this.prisma.role.findUnique({
                where: { id },
            });

            if (!role) return "Role não cadatrado";

            await this.prisma.role.delete({
                where: { id },
            });

            return "OK";
        } catch (err) {
            throw new InternalServerError(err);
        }
    }
}
