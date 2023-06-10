import { v4 as uuid } from "uuid";

export class Benefits {
  public id: string;
  public name: string;

  constructor(props: Omit<Benefits, "id">, id: string = null) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
