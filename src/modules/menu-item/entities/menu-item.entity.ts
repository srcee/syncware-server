import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MenuItemPreparationArea } from 'src/graphql/graphql';
import { MenuCategory } from 'src/modules/menu-category/entities/menu-category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class MenuItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column('decimal')
  price: number;

  @Field(() => MenuCategory)
  @ManyToOne(() => MenuCategory, (cat) => cat.items)
  category: MenuCategory;

  @Field()
  @Column({ default: true })
  isAvailable: boolean;

  @Field()
  @Column({ type: 'enum', enum: MenuItemPreparationArea })
  preparationArea: MenuItemPreparationArea;
}
