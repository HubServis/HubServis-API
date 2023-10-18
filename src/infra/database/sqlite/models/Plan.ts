import { Column, ManyToMany, Entity, JoinTable } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Benefit } from "./Benefit";
import { Limit } from "./Limit";

@Entity("Plans")
export class Plan extends BaseEntity {
  @Column()
  name: string;

  @Column({default: true})
  isPrivated: boolean;

  @Column()
  description: string;

  @Column('decimal', {default: 0})
  price: number;

  // @Column()
  // month_price: string;

  // @Column()
  // reminder_limit: string;

  // @Column()
  // professional_limit: string;

  // @Column()
  // client_limit: string;

  // @Column()
  // customer_limit: string;

  @ManyToMany(() => Benefit, {cascade: true})
  @JoinTable()
  benefits: Benefit[]; //relation to benefits

  @ManyToMany(() => Limit, {cascade: true})
  @JoinTable()
  limits: Limit[]; //relation to limits
}

