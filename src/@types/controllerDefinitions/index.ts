export interface stripeBody {
    id: string;
    object: string;
    api_version: string;
    created: number;
    data: {
        object: {
            id: string;
            object: string;
            amount_paid: number;
            amount_requested: number;
            created: number;
            currency: string;
            invoice: string;
            is_default: boolean;
            livemode: boolean;
            payment: [Object];
            status: string;
            status_transitions: [Object];
        };
    };
    livemode: boolean;
    pending_webhooks: number;
    request: { id: null | string; idempotency_key: null | string };
    type: string;
}
