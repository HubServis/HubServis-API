import { v4 as uuid } from "uuid";

export class Blocking {
	public id: string;
	public DateTimeStart: string;
	public DateTimeEnd: string;
	public description: string;
	public allDay?: boolean;

	constructor(props: Omit<Blocking, "id">, id: string = null) {
		Object.assign(this, props);
		if (!id) {
			this.id = uuid();
		} else {
			this.id = id;
		}
	}
}
