import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Plan } from "./Plan";

@Entity("Benefit")
export class Benefit extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  max_value: number;

  @ManyToOne(() => Plan, (plan) => plan.benefits)
  plan: Pick<Plan, "id">;
}
