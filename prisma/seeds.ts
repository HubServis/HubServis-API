import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

import bcrypt from "bcrypt";

async function main() {
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

    const basic_user = await prisma.user.create({
        data: {
            name: "Hamilthon",
            cpfcnpj: "20522654000192",
            email: "hamilthon@email.com",
            password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
            username: "hamilthon",
            plan: {
                connect: {
                    name: "Essencial",
                    id: "5c11efc7-f4f1-44a5-96be-28581f4dc94b",
                },
            },
            bussines: {
                create: {
                    name: "hamilthon's cabeleleiro",
                },
            },
        },
    });

    console.log("Res", { basic_plans, basic_roles, basic_benefits, basic_user });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.error(err);

        await prisma.$disconnect();

        process.exit(1);
    });
