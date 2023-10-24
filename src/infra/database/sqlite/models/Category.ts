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

@Entity("category")
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isPrivated: boolean;

  @OneToOne(() => User, (user) => user.category)
  owner: User;

  @ManyToOne(() => Business, (business) => business.categories)
  business: Business;

  @ManyToMany(() => Service, (service) => service.categories)
  @JoinTable()
  services: Service[]
}

export default Category;