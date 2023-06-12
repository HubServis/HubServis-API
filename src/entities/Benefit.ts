import { v4 as uuid } from "uuid";

import { Plan } from "./Plan";

export class Benefit {
  public id: string;
  public name: string;
  public description: string;
  public max_value: number;
  public plan: Pick<Plan, "id">;

  constructor(props: Omit<Benefit, "id">, id: string = null) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
