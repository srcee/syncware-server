import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entities/base.entity';
import { MenuItem } from 'src/modules/menu-item/entities/menu-item.entity';
import { Restaurant } from 'src/modules/restaurant/entities/restaurant.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

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
