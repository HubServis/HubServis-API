import Stripe from "stripe";

import { Service } from "@tsed/di";

import { PAYMENT_KEY } from "../config/variables";

@Service()
export class PaymentService {
    private readonly paymentGateway = new Stripe(PAYMENT_KEY as string);

    async createPayment() {}

    async checkPayment() {}

    async cancelPayment() {}
}
