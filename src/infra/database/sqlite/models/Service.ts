import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Business } from "./Business";

@Entity("service")
export class Service extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  duration: string;

  @ManyToOne(() => Business, (business) => business.services, {
    onDelete: "CASCADE",
  })
  business: Business;
}

export default Service;
