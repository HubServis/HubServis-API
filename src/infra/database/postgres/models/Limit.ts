import { Column, Entity } from "typeorm";

import { BaseEntity } from "./BaseEntity";

@Entity("limits")
export class Limit extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({default: 0})
  value: number;

  @Column({ default: true })
  isControllable: boolean;

  @Column({ default: "" })
  role: string;
}
