import { Column, Double, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import Service from "./Service";

@Entity("ratings")
export class Rating extends BaseEntity {
  @Column('decimal')
  rating: number;

  @Column()
  comment: string;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @ManyToOne(() => Service, (service) => service.ratings)
  service: Service;
}

export default Rating;
