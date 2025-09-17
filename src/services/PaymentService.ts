import Stripe from "stripe";

import { Service } from "@tsed/di";

import { InternalServerError } from "@tsed/exceptions";

import { PAYMENT_KEY } from "../config/variables";

import { Plan, User } from "../../generated/prisma";

import { UserService } from "./UserService";

@Service()
export class PaymentService {
    private readonly paymentGateway = new Stripe(PAYMENT_KEY as string);

    async webhookPaymentCheck(payload) {
        try {
        } catch (err) {}
    }

    async createPaymentLink({ plan }: { plan: Partial<Plan>; user: Partial<User> }) {
        try {
            const result = await this.paymentGateway.paymentLinks.create({
                line_items: [
                    {
                        quantity: 1,
                        price: plan.price?.toString(),
                    },
                ],
                currency: "brl",
            });

            if (result.url) {
                return result.url;
            }

            throw new InternalServerError("Erro ao registrar cliente no gateway!!!");
        } catch (err) {
            throw new InternalServerError("Erro ao criar Link de pagamento!!!");
        }
    }

    async createPaymentClient({ clientData }: { clientData: Partial<User> }) {
        try {
            const result = await this.paymentGateway.customers.create({
                email: clientData.email as string,
                name: clientData.name as string,
                phone: clientData.phone as string,
                validate: true,
            });

            if (result.id) {
                try {
                    const userService = new UserService();

                    const payload = await userService.update({ stripeId: result.id }, clientData.id as string);

                    return payload;
                } catch (err) {
                    throw new InternalServerError("Erro atualizar!!!");
                }
            }

            throw new InternalServerError("Erro ao registrar cliente no gateway!!!");
        } catch (err) {
            throw new InternalServerError("Erro ao criar cliente!!!");
        }
    }

    async createRecurrentPayment({ clientData, plan }: { clientData: Partial<User>; plan: Plan }) {
        const result = await this.paymentGateway.paymentIntents.create({
            amount: plan.price,
            currency: "brl",
            customer: clientData.stripeId as string,
            description: plan.description,
            payment_method_types: ["card", "link"],
        });
    }

    async createOneTimePayment() {}

    async checkInvoices() {}
}
