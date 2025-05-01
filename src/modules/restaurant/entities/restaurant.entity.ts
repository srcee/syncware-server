import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { RestaurantTable } from 'src/modules/restaurant-table/entities/restaurant-table.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  location: string;

  @Field(() => Organization)
  @ManyToOne(() => Organization, (org) => org.restaurants)
  organization: Organization;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.restaurant)
  users: User[];

  @Field(() => [RestaurantTable])
  @OneToMany(() => RestaurantTable, (t) => t.restaurant)
  tables: RestaurantTable[];
}
