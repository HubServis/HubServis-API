import { ICreateExpedient, IExpediencysRepository } from "../../repositories/EspedientRepository";

export class CreateEspedientService {
	constructor(private expediencysRepository: IExpediencysRepository) {}

	public async execute(props: ICreateExpedient) {
		const expedient = await this.expediencysRepository.create(props);
		return expedient;
	}
}
