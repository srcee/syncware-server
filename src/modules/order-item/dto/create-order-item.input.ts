import { Field, InputType, Int } from '@nestjs/graphql';
import { OrderItemStatus } from '../../order-item/entities/order-item.entity';

@InputType()
export class CreateOrderItemInput {
  @Field(() => Int)
  orderId: number;

  @Field(() => Int)
  menuItemId: number;

  @Field(() => Int)
  quantity: number;

  @Field({ nullable: true })
  notes?: string;

  @Field(() => OrderItemStatus)
  status: OrderItemStatus;
}
