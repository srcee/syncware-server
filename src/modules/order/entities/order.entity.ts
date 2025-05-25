import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { OrderStatus } from '../../../graphql/graphql';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { RestaurantTable } from '../../restaurant-table/entities/restaurant-table.entity';
import { User } from '../../../common/entities/user.entity';

@ObjectType()
@Entity()
export class Order extends BaseEntity {
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
}
