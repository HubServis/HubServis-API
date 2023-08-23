import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import Service from "./Service";
import { Professional } from "./Professional";
import Business from "./Business";
import { StatusAppointment } from '../../../../enums/models';

@Entity("appointments")
export class Category extends BaseEntity {
  // @Column({type: "varchar"})
  // status: StatusAppointment;
  /* STATUS pode conter uma das opções abaixo:
   CONCLUIDO
   PENDENTE
   CANCELADO
  */

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isPrivated: string;

  @OneToOne(() => User, (user) => user.category)
  owner: User;

  // @ManyToOne(() => User, (user) => user.appointments)
  // user: User;

  @ManyToOne(() => Business, (business) => business.categories)
  business: Business;

  @ManyToMany(() => Service, (service) => service.categories, {
    cascade: true,
  })
  @JoinTable()
  services: Service[]

  // @ManyToOne(() => Service, (service) => service.appointments)
  // service: Service;

  // @ManyToOne(() => Professional, (professional) => professional.appointments)
  // professional: Professional;
}

export default Category;