import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MenuItem } from 'src/modules/menu-item/entities/menu-item.entity';
import { Restaurant } from 'src/modules/restaurant/entities/restaurant.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class MenuCategory {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [MenuItem])
  @OneToMany(() => MenuItem, (item) => item.category)
  items: MenuItem[];

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant)
  restaurant: Restaurant;
}
