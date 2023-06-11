import { Column, ManyToMany, Entity } from "typeorm";

import { BaseEntity } from "./BaseEntity";

import { Benefits } from "../../../../entities/Benefits";

@Entity("Plans")
export class Plans extends BaseEntity {
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

  @ManyToMany(() => Benefits)
  benefits: Benefits[]; //relation to benefits
}
