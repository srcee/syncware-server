import { Entity, OneToMany, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Restaurant } from '../../../modules/restaurant/entities/restaurant.entity';

@ObjectType()
@Entity()
export class Organization extends BaseEntity {
  @Field()
  @Column()
  name: string;

  @Field(() => [Restaurant])
  @OneToMany(() => Restaurant, (restaurant) => restaurant.organization)
  restaurants: Restaurant[];
}
