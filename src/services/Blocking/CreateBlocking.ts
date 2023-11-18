import { IBlockingRepository, ICreateBlocking } from "../../repositories/BlockingRepository";

export class CreateBlockingService {
	constructor(private blockingRepository: IBlockingRepository) {}

	public async execute(props: ICreateBlocking) {
		const blocking = await this.blockingRepository.create(props);

		return blocking;
	}
}