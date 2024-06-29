import { createTransport } from 'nodemailer';

const transportEmail = createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "38aa6f2274a60fb0ab215ddeb91d5421",
  },
});

export default transportEmail;