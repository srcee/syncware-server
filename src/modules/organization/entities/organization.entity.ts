import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Restaurant } from 'src/modules/restaurant/entities/restaurant.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Organization {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  isActive: boolean;

  @Field(() => [Restaurant])
  @OneToMany(() => Restaurant, (restaurant) => restaurant.organization)
  restaurants: Restaurant[];
}
