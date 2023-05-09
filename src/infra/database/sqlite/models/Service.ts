import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Business } from "./Business";

@Entity("service")
export class Service extends BaseEntity {
    @Column()
    name: string;

    @ManyToOne(() => Business, (business) => business.services)
    business: Business
}

export default Service;