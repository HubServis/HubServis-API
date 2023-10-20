import { v4 as uuid } from "uuid";
import { Plan } from "./Plan";

export class User {
  public id: string;
  public name: string;
  public email: string;
  public cpfcnpj: string;
  public username: string;
  public password: string;
  public plan?: Plan;
  public image?: string;

  constructor(props: Omit<User, "id">, id: string = null) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
