import { Response, Request, NextFunction } from "express";
import { IEmailController } from "../interfaces/controllers";
import { EmailRepositoryPostgres } from "../infra/database/postgres/implementations/EmailRepository";
import { ResetPasswordService } from "../services/Email/ResetPassword";

const resetPasswordService = new ResetPasswordService(
  new EmailRepositoryPostgres()
);

class EmailController implements IEmailController {
  async resetPassword(req: Request, res: Response) {
    try {
        const result = await resetPasswordService.execute();
        return res.status(200).json({ data: "Email sended!", test_result: result });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json("Unexpected error");
    }
  }
}

export default new EmailController();