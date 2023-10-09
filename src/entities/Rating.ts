import { v4 as uuid } from "uuid";

export class Rating {
  public id: string;
  public rating: number;
  public comment: string;

  constructor(props: Omit<Rating, "id">, id: string = null) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
