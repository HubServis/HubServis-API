import { ICreateExpedient, IExpediencysRepository } from "../../repositories/EspedientRepository";

export class FindEspedientService {
	constructor(private expediencysRepository: IExpediencysRepository) {}

	public async execute(props: string) {
		const expediencys = await this.expediencysRepository.find(props);
		return expediencys;
	}
}
