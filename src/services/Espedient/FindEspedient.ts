import { ICreateExpedient, IExpediencysRepository } from "../../repositories/EspedientRepository";

export class FindEspedientService {
	constructor(private expediencysRepository: IExpediencysRepository) {}

	public async execute() {
		const expediencys = await this.expediencysRepository.find();
		return expediencys;
	}
}
