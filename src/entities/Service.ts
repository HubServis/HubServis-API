import { v4 as uuid } from "uuid";

export class Service {
	public id: string;
	public name: string;
	public price: string;
	public duration: string;
	public description: string;
	public isPrivated?: boolean;

	constructor(props: Omit<Service, "id">, id: string = null) {
		Object.assign(this, props);
		if (!id) {
			this.id = uuid();
		} else {
			this.id = id;
		}
	}
}
