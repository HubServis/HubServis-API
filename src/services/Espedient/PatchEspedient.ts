import { IExpediencysRepository, IUpdateEspedient } from "../../repositories/EspedientRepository";

export class PatchEspedientService {
	constructor(private expediencysRepository: IExpediencysRepository) {}

	public async execute(props: IUpdateEspedient) {
		const expedient = await this.expediencysRepository.patch(props);
		return expedient;
	}
}
