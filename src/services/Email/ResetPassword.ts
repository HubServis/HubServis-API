// Implementar service de session
import { User } from "../../entities/User";
import { IEmailRepository } from "../../repositories/EmailRepository";
import {
  ISessionRepository,
  UserRequest,
} from "../../repositories/SessionRepository";

export class ResetPasswordService {
  constructor(private emailRepository: IEmailRepository) {}

  public async execute(): Promise<any> {
    const response = await this.emailRepository.resetPassword();
    return response;
  }
}
