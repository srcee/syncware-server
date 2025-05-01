import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemInput } from './dto/create-order-item.input';
import { UpdateOrderItemInput } from './dto/update-order-item.input';

@Resolver('OrderItem')
export class OrderItemResolver {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Mutation('createOrderItem')
  create(
    @Args('createOrderItemInput') createOrderItemInput: CreateOrderItemInput,
  ) {
    return this.orderItemService.create(createOrderItemInput);
  }

  @Query('orderItem')
  findOne(@Args('id') id: number) {
    return this.orderItemService.findOne(id);
  }

  @Mutation('updateOrderItem')
  update(
    @Args('updateOrderItemInput') updateOrderItemInput: UpdateOrderItemInput,
  ) {
    return this.orderItemService.update(
      updateOrderItemInput.id,
      updateOrderItemInput,
    );
  }

  @Mutation('deleteOrderItem')
  delete(@Args('id') id: number) {
    return this.orderItemService.delete(id);
  }
}
