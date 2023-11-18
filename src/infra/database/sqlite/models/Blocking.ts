import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { v4 as uuid } from "uuid";
import Business from "./Business";
import { Professional } from "./Professional";

@Entity("blockings")
export class Blocking extends BaseEntity {
	@Column()
	DateTimeStart: string;

	@Column()
	DateTimeEnd: string;

	@Column()
	description: string;

	@Column({ default: false })
	allDay: boolean;

	@Column({ default: true })
	allProfessionals: boolean;

	@ManyToOne(() => Business, (business) => business.blockings)
	business: Business;

	@OneToMany(() => Professional, (professional) => professional.blockings)
	professional: Professional[];
}

export default Blocking;
