import { v4 as uuid } from "uuid";

export class Session {
  public id: string;
  public email: string;
  public userId: string;
  public expiresAt: string;

  constructor(props: Omit<Session, "id">, id: string = null) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
