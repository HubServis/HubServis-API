import { v4 as uuid } from "uuid";

export class Benefit {
  public id: string;
  public name: string;
  public description: string;
  public max_value: number;

  constructor(props: Omit<Benefit, "id">, id: string = null) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}