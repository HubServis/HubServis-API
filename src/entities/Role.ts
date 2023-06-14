import { v4 as uuid } from "uuid";

export class Role {
  public id: string;
  public name: string;
  public description: string;

  constructor(props: Omit<Role, "id">, id: string = null) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
