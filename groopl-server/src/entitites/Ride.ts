import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Message } from "./Message";
import { User } from "./User";

@ObjectType()
@Entity()
export class Ride extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  to!: string;

  @Field()
  @Column()
  from!: string;

  @Field()
  @Column()
  when!: Date;

  @Field()
  @Column({ type: "int" })
  seats!: number;

  @Field()
  @Column({ type: "int" })
  remainingSeats!: number;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => [Int] || null)
  @Column("int", { array: true })
  passengers?: number[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.rides)
  creator: User;

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.ride)
  messages: Message[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
