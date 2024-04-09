import Database from "../config";

import { Session as SessionSchema } from "../models/Session";

import { Session } from "../../../../entities/Session";

import {
  ISessionRepository,
  UserRequest,
} from "../../../../repositories/SessionRepository";
export class SessionRepositoryPostgres implements ISessionRepository {
  public async createSession(
    props: UserRequest,
  ): Promise<Error | Omit<SessionSchema | "id", "createdAt">> {
    try {
      const { email, user, expiration } = props;

      const sessionRepository = (await Database).getRepository(SessionSchema);

      const session = await sessionRepository.findOne({
        where: { email: email },
      });

      if (session) {
        return session.userId;
      }

      const newSession = new Session({
        email,
        userId: user,
        expiresAt: expiration,
      });

      await sessionRepository.insert(newSession);

      return { userId: user };
    } catch (err) {
      console.log(err);

      return new Error(err.message);
    }
  }

  public async hasToken(user: string): Promise<any> {
    try {
      const sessionRepository = (await Database).getRepository(SessionSchema);

      const session = await sessionRepository.findOne({
        where: { userId: user },
      });

      if (!session) {
        return false;
      }

      return session;
    } catch (err) {
      return new Error(err.message);
    }
  }

  public async removeSession(user: string): Promise<Error | boolean> {
    try {
      const sessionRepository = (await Database).getRepository(SessionSchema);

      const session = await sessionRepository.findOne({
        where: { userId: user },
      });

      if (!session) {
        return true;
      }

      const result = await sessionRepository.remove(session);

      console.log(result);

      return true;
    } catch (err) {
      return new Error(err.message);
    }
  }
}
