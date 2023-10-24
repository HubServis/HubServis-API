import { IExtraCreate, IExtraRepository } from "../../repositories/ExtraRepository";

export class FindExtraService {
	constructor(private extrasRepository: IExtraRepository) {}

	public async execute() {
		const extra = await this.extrasRepository.find();

		return extra;
	}
}
