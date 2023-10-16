import { IExtraRepository, IExtraUpdate } from "../../repositories/ExtraRepository";

export class UpdateExtraService {
	constructor(private extrasRepository: IExtraRepository) {}

	public async execute(props: IExtraUpdate) {
		const extra = await this.extrasRepository.patch(props);

		return extra;
	}
}
