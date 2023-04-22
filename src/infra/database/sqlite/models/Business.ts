import { Column, Entity, JoinColumn, JoinTable, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("business")
export class Business extends BaseEntity {
    @Column()
    name: string;

    @OneToOne(() => User, user => user.business)
    user: User;
}

export default Business;