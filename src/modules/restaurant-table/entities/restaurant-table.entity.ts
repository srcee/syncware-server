import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Restaurant } from 'src/modules/restaurant/entities/restaurant.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum RestaurantTableStatus {
  Available = 'available',
  Occupied = 'occupied',
  Reserved = 'reserved',
}

@ObjectType()
@Entity()
export class RestaurantTable extends BaseEntity {
  @Field()
  @Column()
  tableName: string;

  @Field()
  @Column()
  seats: number;

  @Field()
  @Column({ type: 'enum', enum: RestaurantTableStatus })
  status: RestaurantTableStatus;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, (r) => r.tables)
  restaurant: Restaurant;
}
