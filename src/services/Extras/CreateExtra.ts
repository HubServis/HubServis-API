import { IExtraCreate, IExtraRepository } from "../../repositories/ExtraRepository";

export class CreateExtraService {
	constructor(private extrasRepository: IExtraRepository) {}

	public async execute(props: IExtraCreate) {
		const extra = await this.extrasRepository.create(props);

		return extra;
	}
}
