import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Ride } from "./Ride";

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  sender_id!: number;

  @Field()
  @Column()
  receiver_id!: number;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column()
  is_read: Boolean;

  @Field(() => Ride)
  @ManyToOne(() => Ride, (ride) => ride.messages)
  ride: Ride;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
