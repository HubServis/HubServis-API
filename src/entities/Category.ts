import { v4 as uuid } from "uuid";

export class Category {
  public id: string;
  public name: string;
  public isPrivated: boolean;
  public description: string;

  constructor(props: Omit<Category, "id">, id: string = null) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
