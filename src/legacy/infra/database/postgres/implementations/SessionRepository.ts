import Database from "../config";

import { Session as SessionSchema } from "../models/Session";

import {
  ISessionRepository,
  UserRequest,
} from "../../../../repositories/SessionRepository";

export class SessionRepositoryPostgres implements ISessionRepository {
  public async handle(
    props: UserRequest,
  ): Promise<Error | Omit<SessionSchema | "id", "createdAt">> {
    try {
      const { email, user, expiration } = props;

      const sessionRepository = (await Database).getRepository(SessionSchema);

      const session = await sessionRepository.findOne({
        where: { email: email },
      });

      if (session) {
        return session;
      }

      await sessionRepository.insert({
        email,
        userId: user,
        expiresAt: expiration,
      });

      return { email, userId: user, expiresAt: expiration };
    } catch (err) {
      return new Error(err.message);
    }
  }

  public async isExpired(expiration: number): Promise<Error |boolean> {
    try {
      const sessionRepository = (await Database).getRepository(SessionSchema);

      const session = await sessionRepository.findOne({
        where: { expiresAt: expiration },
      });

      if (!session) {
        return true;
      }

      return false;
    } catch (err) {
      return new Error(err.message);
    }
  }
}
