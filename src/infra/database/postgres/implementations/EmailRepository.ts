import Database from "../config";
import { In } from "typeorm";
import { IEmailRepository } from "../../../../repositories/EmailRepository";
import transportEmail from "../../../../utils/mailer";

export class EmailRepositoryPostgres implements IEmailRepository {
  public async resetPassword(): Promise<string | Error> {

    
    return "Email sended for people!";
  }
}
