import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MenuItem } from 'src/modules/menu-item/entities/menu-item.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderItemStatus {
  Queued = 'queued',
  Preparing = 'preparing',
  Ready = 'ready',
  Delivered = 'delivered',
}

@ObjectType()
@Entity()
export class OrderItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

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
