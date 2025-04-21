import { v4 as uuid } from "uuid";

export class Business {
  public id: string;
  public name: string;

  constructor(props: Omit<Business, "id">, id: string = null) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
