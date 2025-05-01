import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from 'src/graphql/graphql';
import { OrderItem } from 'src/modules/order-item/entities/order-item.entity';
import { RestaurantTable } from 'src/modules/restaurant-table/entities/restaurant-table.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => RestaurantTable)
  @ManyToOne(() => RestaurantTable)
  table: RestaurantTable;

  @Field(() => User)
  @ManyToOne(() => User)
  waiter: User;

  @Field(() => [OrderItem])
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Field()
  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
