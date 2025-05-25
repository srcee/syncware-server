import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { MenuItem } from '../../menu-item/entities/menu-item.entity';
import { Order } from '../../order/entities/order.entity';

export enum OrderItemStatus {
  Queued = 'queued',
  Preparing = 'preparing',
  Ready = 'ready',
  Delivered = 'delivered',
}

@ObjectType()
@Entity()
export class OrderItem extends BaseEntity {
  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @Field(() => MenuItem)
  @ManyToOne(() => MenuItem)
  menuItem: MenuItem;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column({ nullable: true })
  notes: string;

  @Field()
  @Column({ type: 'enum', enum: OrderItemStatus })
  status: OrderItemStatus;
}
