import { v4 as uuid } from "uuid";

import { Benefit } from "./Benefit";

export class Plan {
  public id: string;
  public name: string;
  public price: number;
  public benefits: Benefit[];
  public description: string;
  public month_price: string;
  public client_limit: string
  public customer_limit: string;
  public reminder_limit: string;
  public professional_limit: string;

  constructor(props: Omit<Plan, "id">, id: string = null) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
