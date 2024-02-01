import {
  Column,
  Entity,
  ManyToOne,
  OneToMany
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { v4 as uuid } from "uuid";
import Business from "./Business";
import { Professional } from "./Professional";

@Entity("expediencys")
export class Expedient extends BaseEntity {
	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	expediencysInfos: string;

	@ManyToOne(() => Business, (business) => business.expediencys)
	business: Business;

	@OneToMany(() => Professional, (professional) => professional.expediencys)
	professionals: Professional[];
}

export default Expedient;