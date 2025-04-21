import { v4 as uuid } from "uuid";

export class Extra {
  public id: string;
  public name: string;
  public description: string;
  public value: number;
  public isControllable: boolean;
  public role: string;

  constructor(props: Omit<Extra, "id">, id: string = null) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
