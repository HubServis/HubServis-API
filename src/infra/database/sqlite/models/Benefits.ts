import {
  Column,
  ManyToMany,
  JoinTable,
  Entity,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { BaseEntity } from "./BaseEntity";

@Entity("Benefits")
export class Benefits extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  max_value: string;
}
