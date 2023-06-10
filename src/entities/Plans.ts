import { v4 as uuid } from "uuid";

export class Plans {
  public id: string;
  public name: string;
  public description: string;
  public price: number;

  constructor(props: Omit<Plans, "id">, id: string = null) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
