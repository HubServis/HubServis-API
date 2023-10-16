import { IExtraRepository, IExtraUpdate } from "../../repositories/ExtraRepository";

export class DeleteExtraService {
	constructor(private extrasRepository: IExtraRepository) {}

	public async execute(props: string) {
		const extra = await this.extrasRepository.delete(props);

		return extra;
	}
}
