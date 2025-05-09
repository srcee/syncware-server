import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Restaurant } from 'src/modules/restaurant/entities/restaurant.entity';
import { Entity, OneToMany, Column } from 'typeorm';

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
