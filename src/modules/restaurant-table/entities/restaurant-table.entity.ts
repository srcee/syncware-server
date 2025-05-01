import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Restaurant } from 'src/modules/restaurant/entities/restaurant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum RestaurantTableStatus {
  Available = 'available',
  Occupied = 'occupied',
  Reserved = 'reserved',
}

@ObjectType()
@Entity()
export class RestaurantTable {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

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
