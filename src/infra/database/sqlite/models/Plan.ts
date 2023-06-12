import { Column, ManyToMany, Entity, OneToMany } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Benefit } from "./Benefit";

@Entity("Plans")
export class Plan extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  month_price: string;

  @Column()
  reminder_limit: string;

  @Column()
  professional_limit: string;

  @Column()
  customer_limit: string;

  @Column()
  extra_benefits: string; //???

  @OneToMany(() => Benefit, (benefit) => benefit.plan)
  benefits: Benefit[]; //relation to benefits
}
