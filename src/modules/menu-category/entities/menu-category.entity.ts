import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { MenuItem } from '../../menu-item/entities/menu-item.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@ObjectType()
@Entity()
export class MenuCategory extends BaseEntity {
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
