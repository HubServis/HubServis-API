import { InternalServerError } from "@tsed/exceptions";

import nodemailer from "nodemailer";

import { SMPT_PASS, SMPT_SECURE, SMPT_USER, SMTP_HOST } from "../variables";

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    secure: SMPT_SECURE,
    auth: {
        user: SMPT_USER,
        pass: SMPT_PASS,
    },
});

export const mailerModule = async ({
    from = "suporte.cortae@gmail.com",
    to,
    subject,
    text,
    html,
}: {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
}) => {
    const info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
    });

    if (info.rejected) {
        throw new InternalServerError(`Houve um erro ao enviar a mensagem! ${info.messageId} - ${info.response}`);
    }

    return true;
};
