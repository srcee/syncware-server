import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entities/base.entity';
import { OrderStatus } from 'src/graphql/graphql';
import { OrderItem } from 'src/modules/order-item/entities/order-item.entity';
import { RestaurantTable } from 'src/modules/restaurant-table/entities/restaurant-table.entity';
import { User } from 'src/common/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

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
