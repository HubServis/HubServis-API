import { v4 as uuid } from "uuid";

import { Benefit } from "./Benefit";

export class Plan {
  public id: string;
  public name: string;
  public description: string;
  public price: number;
  public benefits: Benefit[];

  constructor(props: Omit<Plan, "id">, id: string = null) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
