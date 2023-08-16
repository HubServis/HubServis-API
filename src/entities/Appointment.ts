import { v4 as uuid } from "uuid";

export class Appointment {
  public id: string;
  public status: string;
  public date_time: string;

  constructor(props: Omit<Appointment, "id">, id: string = null) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
