import { Field, InputType, Int } from '@nestjs/graphql';
import { OrderStatus } from '../../../graphql/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  tableId: number;

  @Field(() => Int)
  waiterId: number;

  @Field({ nullable: true })
  status?: OrderStatus;

  @Field(() => [Int], { nullable: true })
  itemIds?: number[];
}
