import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemInput } from './create-order-item.input';

export class UpdateOrderItemInput extends PartialType(CreateOrderItemInput) {
  id: number;
}
