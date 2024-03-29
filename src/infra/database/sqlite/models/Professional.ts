import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import Business from "./Business";
import { User } from "./User";
import Appointment from "./Appointment";

@Entity("professional")
export class Professional extends BaseEntity {
  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  cpfcnpj: string;

  @Column()
  isRegistred: boolean;

  @OneToOne(() => User, (user) => user.professional, { nullable: true })
  user: User;

  @ManyToOne(() => Business, (business) => business.services)
  business: Business;

  @OneToMany(() => Appointment, (appointment) => appointment.professional)
  appointments: Appointment[]
}
