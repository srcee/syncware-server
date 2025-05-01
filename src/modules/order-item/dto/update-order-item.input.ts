import { CreateOrderItemInput } from './create-order-item.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateOrderItemInput extends PartialType(CreateOrderItemInput) {
  id: number;
}
