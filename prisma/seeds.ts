import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

import bcrypt from "bcrypt";
import { logger } from "@tsed/di";

async function main() {
    try {
        const result = [];

        const promiseTest = new Promise(async (resolv, reject) => {
            try {
                const planCount = await prisma.plan.count();
                const benefitCount = await prisma.benefit.count();
                const roleCount = await prisma.role.count();
                const userCount = await prisma.user.count();

                resolv([planCount, benefitCount, roleCount, userCount]);
            } catch (err) {
                return reject(err);
            }
        }).then(([planCount, benefitCount, roleCount, userCount]) => {
            let exists = [];

            if (planCount > 0) exists.push("Plan");
            if (benefitCount > 0) exists.push("Benefit");
            if (roleCount > 0) exists.push("Role");
            if (userCount > 0) exists.push("User");

            return exists;
        });

        const alreadyExecuted = await Promise.resolve(promiseTest);

        logger().info("Checking existing records...", alreadyExecuted);

        if (!alreadyExecuted.includes("Plan")) {
            const basic_plans = await prisma.plan.createMany({
                data: [
                    {
                        id: "5c11efc7-f4f1-44a5-96be-28581f4dc94b",
                        name: "Essencial",
                        description: "Plano Gratuito",
                        isPrivated: false,
                        price: 0,
                    },
                    {
                        id: "785708a5-453d-406e-b48d-37320ca7a2a3",
                        name: "Profissional",
                        description: "Plano profissional",
                        isPrivated: false,
                        price: 100,
                    },
                    {
                        id: "2952e96c-fcf3-430c-b265-fb5d0a5b5c8d",
                        name: "Elite",
                        description: "Plano Elite",
                        isPrivated: false,
                        price: 250,
                    },
                    {
                        id: "e31ed7e0-5a65-4dd0-976f-c1cc36c886db",
                        name: "Infinity",
                        description: "Plano Customizado",
                        price: 0,
                        isPrivated: true,
                    },
                ],
            });

            result.push(basic_plans);
        }

        if (!alreadyExecuted.includes("Benefit")) {
            const basic_benefits = await prisma.benefit.createMany({
                data: [
                    {
                        name: "50 clientes",
                        description: "possiblidade de fazer 50 agendamentos",
                        bonusPoint: 0,
                        value: 0,
                    },
                    {
                        name: "Área de funcionários",
                        description: "possibilidade de configurar funcionários",
                        bonusPoint: 0,
                        value: 0,
                    },
                    {
                        name: "Área clientes",
                        description: "possibilidade de enchergar os clientes cadastrados",
                        bonusPoint: 0,
                        value: 0,
                    },
                    {
                        name: "Lista de agendamentos",
                        description: "pode listar os agendamentos feitos",
                        bonusPoint: 0,
                        value: 0,
                    },
                    {
                        name: "configuração de agendas",
                        description: "possiblidade de configurar os períodos de atendimento dos funcionários",
                        bonusPoint: 0,
                        value: 0,
                    },
                ],
            });

            result.push(basic_benefits);
        }

        if (!alreadyExecuted.includes("Role")) {
            const basic_roles = await prisma.role.createMany({
                data: [
                    { name: "painel_admin" },
                    { name: "cadastro_funcionarios" },
                    { name: "visualizacao_funcionarios" },
                    { name: "cadastro_agendamentos" },
                    { name: "visualizacao_agendamentos" },
                    { name: "meus_agendamentos" },
                    { name: "aprovacao_troca_de_agendamentos" },
                    { name: "relatorio_rh" },
                    { name: "relatorios_agendamentos" },
                    { name: "controle_horas" },
                    { name: "configuracoes_sistema" },
                    { name: "exportar_dados" },
                ],
            });

            result.push(basic_roles);
        }

        if (!alreadyExecuted.includes("User")) {
            const basic_user = await prisma.user.create({
                data: {
                    name: "Hamilthon",
                    cpfcnpj: "20522654000192",
                    email: "hamilthon@email.com",
                    password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
                    phone: "11999999999",
                    plan: {
                        connect: {
                            name: "Essencial",
                            id: "5c11efc7-f4f1-44a5-96be-28581f4dc94b",
                        },
                    },
                    business: {
                        create: {
                            name: "hamilthon's cabeleleiro",
                            businessType: "Cabeleleiro",
                        },
                    },
                },
            });

            result.push(basic_user);
        }

        logger().log("Res", JSON.stringify(result));

        logger().info("Seed finalizado com sucesso!");

        return;
    } catch (err) {
        logger().error(err);

        throw new Error(`Erro ao popular o banco: ${err}`);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        logger().error(err);

        await prisma.$disconnect();

        process.exit(1);
    });
