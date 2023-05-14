import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import Service from "./Service";
import { Professional } from "./Professional";

@Entity("appointments")
export class Business extends BaseEntity {
    @Column()
    name: string;

    @OneToOne(() => User, user => user.business)
    user: User;

    @OneToMany(() => Service, (service) => service.business)
    services: Service[]
    
    @OneToMany(() => Professional, (professional) => professional.business)
    professionals: Professional[]
}

export default Business;