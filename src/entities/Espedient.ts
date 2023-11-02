import { v4 as uuid } from "uuid";

export class Espedient {
	public id: string;
	public name: string;
	public description: string;
	public expediencysInfos: string;

	constructor(props: Omit<Espedient, "id">, id: string = null) {
		Object.assign(this, props);
		if (!id) {
			this.id = uuid();
		} else {
			this.id = id;
		}
	}
}
